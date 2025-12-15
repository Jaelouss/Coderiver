import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

export const useScrollAnimation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const progressRef = useRef(0);

	useEffect(() => {
		const tl = gsap.timeline({ paused: true });

		tl.fromTo(".hero-title",
			{ y: "0%", opacity: 1, filter: "blur(0px)" },
			{ y: "100%", opacity: 0, filter: "blur(20px)", duration: 1, ease: "linear" }
		)
			.fromTo(".header-logo",
				{ y: "0%", opacity: 1, filter: "blur(0px)" },
				{ y: "100%", opacity: 0, filter: "blur(20px)", duration: 1, ease: "linear" },
				"<"
			);

		timelineRef.current = tl;

		tl.progress(1);

		gsap.to(tl, { progress: 0, duration: 2.5, ease: "power3.out" });


		const observer = Observer.create({
			target: window,
			type: "wheel,touch,pointer",
			onChange: (self) => {
				const delta = self.deltaY;
				const sensitivity = 0.002;
				let newProgress = progressRef.current + (delta * sensitivity);
				newProgress = gsap.utils.clamp(0, 1, newProgress);

				progressRef.current = newProgress;

				gsap.to(tl, { progress: newProgress, duration: 0.5, ease: "power2.out", overwrite: true });

				setIsOpen(newProgress > 0.5);
			},
			preventDefault: true
		});

		return () => {
			observer.kill();
			tl.kill();
		};
	}, []);

	const handleScrollClick = () => {
		const targetProgress = isOpen ? 0 : 1;
		const tl = timelineRef.current;

		if (tl) {
			gsap.to(tl, {
				progress: targetProgress,
				duration: 1.5,
				ease: "power3.inOut",
				onUpdate: () => {
					progressRef.current = tl.progress();
				},
				onComplete: () => {
					progressRef.current = targetProgress;
					setIsOpen(targetProgress === 1);
				}
			});
			setIsOpen(targetProgress === 1);
		}
	};

	return { isOpen, handleScrollClick };
};

import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { SCRAMBLE_CONFIG } from '../configs/scrambleConfig';

export const useScramble = (initialText: string) => {
	const [displayText, setDisplayText] = useState(initialText);
	const tweenRef = useRef<gsap.core.Tween | null>(null);

	useEffect(() => {
		setDisplayText(initialText);
	}, [initialText]);

	const scramble = useCallback(() => {
		if (tweenRef.current) tweenRef.current.kill();

		const length = initialText.length;
		const counter = { value: 0 };
		const duration = Math.min(
			SCRAMBLE_CONFIG.MAX_DURATION,
			Math.max(SCRAMBLE_CONFIG.MIN_DURATION, length * SCRAMBLE_CONFIG.DURATION_MULTIPLIER)
		);

		tweenRef.current = gsap.to(counter, {
			value: length,
			duration: duration,
			ease: "none",
			onUpdate: () => {
				const index = Math.floor(counter.value);
				let result = initialText.substring(0, index);

				if (index < length) {
					const randomChar = SCRAMBLE_CONFIG.CHARS[Math.floor(Math.random() * SCRAMBLE_CONFIG.CHARS.length)];
					result += randomChar;
				}

				setDisplayText(result);
			},
			onComplete: () => {
				setDisplayText(initialText);
			}
		});
	}, [initialText]);

	const stop = useCallback(() => {
		if (tweenRef.current) {
			tweenRef.current.kill();
			setDisplayText(initialText);
		}
	}, [initialText]);

	useEffect(() => {
		return () => {
			if (tweenRef.current) tweenRef.current.kill();
		};
	}, []);

	return { displayText, scramble, stop };
};
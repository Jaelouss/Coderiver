import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { particleWaveConfig } from '../configs';
import { ParticleWaveProps } from '../types';
import { CanvasContainer } from '@styles';



export const ParticleWave = ({ config }: ParticleWaveProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const animationFrameRef = useRef<number>(0);

	if (!config) {
		config = particleWaveConfig;
	}
	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const width = container.clientWidth;
		const height = container.clientHeight;

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(0, width, 0, height, 0.1, 1000);
		camera.position.z = 100;

		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);

		const particleCount = config.particleCount;
		const positions = new Float32Array(particleCount * 3);
		const colors = new Float32Array(particleCount * 3);
		const sizes = new Float32Array(particleCount);
		const baseOffsets = new Float32Array(particleCount);
		const wavePhases = new Float32Array(particleCount);
		const simulationX = new Float32Array(particleCount);

		const colorStart = new THREE.Color(config.colorStart);
		const colorMid = new THREE.Color(config.colorMid);
		const colorEnd = new THREE.Color(config.colorEnd);

		const waveCenter = height / 2;

		for (let i = 0; i < particleCount; i++) {
			const x = Math.random() * width * 1.4 - width * 0.2;
			simulationX[i] = x;

			positions[i * 3] = x;
			positions[i * 3 + 1] = waveCenter;
			positions[i * 3 + 2] = 0;

			baseOffsets[i] = (Math.random() - 0.5) * 2;
			wavePhases[i] = Math.random() * Math.PI * 2;
			sizes[i] = 1.2 + Math.random() * 1.8;
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
		geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

		const material = new THREE.ShaderMaterial({
			uniforms: {
				pixelRatio: { value: renderer.getPixelRatio() },
			},
			vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float pixelRatio;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * pixelRatio * 2.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
			fragmentShader: `
        varying vec3 vColor;

        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          if (distanceToCenter > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.2, 0.5, distanceToCenter);
          gl_FragColor = vec4(vColor, alpha * 0.85);
        }
      `,
			transparent: true,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
		});

		const particles = new THREE.Points(geometry, material);
		scene.add(particles);

		const mouse = new THREE.Vector2(-1000, -1000);

		const handleMouseMove = (event: MouseEvent) => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;
			mouse.x = event.clientX - rect.left;
			mouse.y = event.clientY - rect.top;
		};

		const handleMouseLeave = () => {
			mouse.set(-1000, -1000);
		};

		if (container) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseout', handleMouseLeave);
		}

		let time = 0;

		const animate = () => {
			time += config.timeSpeed;

			const positionAttribute = geometry.attributes.position;
			const colorAttribute = geometry.attributes.color;

			for (let i = 0; i < particleCount; i++) {
				let x = simulationX[i];

				x += config.particleSpeed * config.direction;

				if (config.direction === 1) {
					if (x > width * 1.2) {
						x = -width * 0.2;
						wavePhases[i] = Math.random() * Math.PI * 2;
						baseOffsets[i] = (Math.random() - 0.5) * 2;
					}
				} else {
					if (x < -width * 0.2) {
						x = width * 1.2;
						wavePhases[i] = Math.random() * Math.PI * 2;
						baseOffsets[i] = (Math.random() - 0.5) * 2;
					}
				}


				simulationX[i] = x;

				const numWaves = 1.5;
				const waveFreq = (Math.PI * 2 * numWaves) / width;

				const halfHeight = height * 0.5;

				const maxWaveAmplitude = halfHeight * 0.5;
				const maxThickness = halfHeight * 0.4;

				const mainWave = Math.sin(x * waveFreq + time * 0.3) * maxWaveAmplitude * 0.6;

				const secondWave = Math.sin(x * waveFreq * 1.7 + time * 0.35) * maxWaveAmplitude * 0.3;

				const tertiaryWave = Math.sin(x * waveFreq * 3.2 + time * 0.25) * maxWaveAmplitude * 0.1;

				const waveCenterY = waveCenter + mainWave + secondWave + tertiaryWave;

				const thicknessBase = maxThickness * 0.8;
				const thicknessVar = maxThickness * 0.5;

				let thickness = thicknessBase + Math.sin(x * waveFreq * 0.8 + time * 0.2) * (thicknessVar * 0.6);
				thickness += Math.sin(x * waveFreq * 4 + time * 0.5) * (thicknessVar * 0.4);

				const minRadius = config.minThickness;
				thickness = Math.max(minRadius, thickness);

				const flowSpeed = time * 0.2;

				const topFreq = (Math.PI * 2.2) / width;
				const topSignal = Math.sin(x * topFreq + flowSpeed);
				const topExpansion = Math.max(0, topSignal - 0.2) * (halfHeight * 1.0);

				const botFreq = (Math.PI * 3.5) / width;
				const botSignal = Math.sin(x * botFreq + flowSpeed + 2.5);
				const botExpansion = Math.max(0, botSignal - 0.2) * (halfHeight * 1.0);

				let splashEffect = 0;
				const edgeIntensity = Math.abs(baseOffsets[i]);

				if (baseOffsets[i] > 0) {
					splashEffect = topExpansion * Math.pow(edgeIntensity, 2);
				} else {
					splashEffect = botExpansion * Math.pow(edgeIntensity, 2);
				}

				const currentRadius = thickness + splashEffect;
				const offsetY = baseOffsets[i] * currentRadius;

				const scatter = Math.sin(wavePhases[i]) * (height * 0.02);

				let y = waveCenterY + offsetY + scatter;

				const dx = x - mouse.x;
				const dy = y - mouse.y;
				const distSq = dx * dx + dy * dy;

				const interactRadius = config.interactionRadius;
				const interactRadiusSq = interactRadius * interactRadius;

				let finalX = x;
				let finalY = y;

				if (distSq < interactRadiusSq) {
					const dist = Math.sqrt(distSq);
					const intensity = (1 - dist / interactRadius);

					const jitterX = Math.sin(time * 20 + i) * config.interactionIntensity * intensity;
					const jitterY = Math.cos(time * 25 + i * 1.5) * config.interactionIntensity * intensity;

					finalX += jitterX;
					finalY += jitterY;
				}

				positionAttribute.setXY(i, finalX, finalY);

				const normalizedScreenX = Math.max(0, Math.min(1, finalX / width));
				let color: THREE.Color;

				if (normalizedScreenX < 0.5) {
					color = colorStart.clone().lerp(colorMid, normalizedScreenX * 2);
				} else {
					color = colorMid.clone().lerp(colorEnd, (normalizedScreenX - 0.5) * 2);
				}

				if (distSq < interactRadiusSq) {
					color.setRGB(1, 1, 1);
					color.lerp(colorStart, 0.5);
				} else {
					const brightness = 0.95 + Math.random() * 0.1;
					color.r *= brightness;
					color.g *= brightness;
					color.b *= brightness;
				}

				colorAttribute.setXYZ(i, color.r, color.g, color.b);
			}

			positionAttribute.needsUpdate = true;
			colorAttribute.needsUpdate = true;

			renderer.render(scene, camera);
			animationFrameRef.current = requestAnimationFrame(animate);
		};

		animate();

		const handleResize = () => {
			const newWidth = container.clientWidth;
			const newHeight = container.clientHeight;

			camera.right = newWidth;
			camera.bottom = newHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(newWidth, newHeight);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseout', handleMouseLeave);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			renderer.dispose();
			geometry.dispose();
			material.dispose();
			if (container && container.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
		};
	}, [config]);

	return <CanvasContainer ref={containerRef} />;
};

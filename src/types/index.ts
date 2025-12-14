export type navMenuListType = {
	label: string;
	href: string;
}

export type ScrambleTextProps = {
	children: string;
}

export type HeaderProps = {
	menuList: navMenuListType[];
}

export interface ParticleWaveConfig {
	colorStart: string;
	colorMid: string;
	colorEnd: string;
	particleCount: number;
	particleSpeed: number;
	timeSpeed: number;
	interactionRadius: number;
	interactionIntensity: number;
	minThickness: number;
	direction: 1 | -1;
}

export interface ParticleWaveProps {
	config?: ParticleWaveConfig;
}

export interface HeroTitleProps {
	children: React.ReactNode;
}

export interface ScrollButtonProps {
	onClick: () => void;
	isOpen: boolean;
}
import { useScramble } from '@hooks';
import { useEffect } from 'react';
import { ScrambleTextProps } from '@types';

export const ScrambleText = ({ children }: ScrambleTextProps) => {
	const { displayText, scramble, stop } = useScramble(children);

	useEffect(() => {
		scramble();
	}, [scramble]);

	return (
		<span
			onMouseEnter={scramble}
			onMouseLeave={stop}
			style={{ display: 'inline-block', position: 'relative', cursor: 'pointer', whiteSpace: 'nowrap' }}
		>
			<span style={{ opacity: 0 }}>{children}</span>
			<span style={{ position: 'absolute', top: 0, left: 0 }}>
				{displayText}
			</span>
		</span>
	);
};

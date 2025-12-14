import { ScrollButtonWrapper } from "@styles";
import ArrowBottom from "@assets/arrowBottom.svg?react";
import { ScrollButtonProps } from "@types";

export const ScrollButton = ({ onClick, isOpen }: ScrollButtonProps) => {
	return (
		<ScrollButtonWrapper
			type="button"
			onClick={onClick}
			$isOpen={isOpen}
		>
			<ArrowBottom />
		</ScrollButtonWrapper>
	);
};

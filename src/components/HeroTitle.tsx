import { StyledTitle, TitleWrapper } from "@styles";
import { HeroTitleProps } from "@types";

export const HeroTitle = ({ children }: HeroTitleProps) => {
  return (
    <TitleWrapper>
      <StyledTitle className="hero-title">
        {children}
      </StyledTitle>
    </TitleWrapper>
  );
};

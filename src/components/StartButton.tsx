import { BgIcon, StartButtonWrapper, StyledStartButton } from "@styles";

export const StartButton = () => {
  return (
    <StartButtonWrapper>
      <BgIcon />
      <StyledStartButton type="button">START TODAY!</StyledStartButton>
    </StartButtonWrapper>
  );
};
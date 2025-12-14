import { ContentWrapper, MainWrapper } from "@styles";
import "@styles/app.css";

import { NAV_MENU } from "./constants";
import { StartButton, Header, ScrollButton, ParticleWave, HeroTitle } from "@components";
import { particleWaveConfig } from "@configs";
import { useScrollAnimation } from "@hooks";

function App() {
  const { isOpen, handleScrollClick } = useScrollAnimation();

  return (
    <>
      <MainWrapper className="main-background">
        <Header menuList={NAV_MENU} />
        <ParticleWave config={particleWaveConfig} />
        <ContentWrapper>
          <StartButton />
          <HeroTitle>Building the future of medicine with AI</HeroTitle>
          <ScrollButton onClick={handleScrollClick} isOpen={isOpen} />
        </ContentWrapper>
      </MainWrapper>
    </>
  );
}

export default App;
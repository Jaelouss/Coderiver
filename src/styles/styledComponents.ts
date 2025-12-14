import styled from "styled-components";
import StartButtonBackground from "@assets/startButtonBackground.svg?react";

export const MainWrapper = styled.main`
  background-color: #19181b;
  min-height: 100vh;
  color: white;
  position: relative;
  overflow: hidden;
  background-image: url('Coderiver/mainBackground.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    background-position: 60% center;
  }

`;


export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding-inline: 3rem;
  padding-block: 3rem 1rem;

  @media (max-width: 768px) {
    padding-inline: 1.5rem;
    padding-block: 2rem 1rem;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    padding-inline: 1rem;
    padding-block: 1.5rem 1rem;
  }
  position: relative;
  z-index: 2;
`;

export const MainNav = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 50px;

  @media (max-width: 1024px) {
    gap: 30px;
  }

  @media (max-width: 768px) {
     gap: 20px;
     flex-wrap: wrap;
     justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
  list-style: none;
  padding: 0;
  margin: 0;
  opacity: 0.4;

  li {
     display: flex;
  }

  a {
    text-decoration: none;
    color: #FFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;


export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  z-index:2;
`;

export const StartButtonWrapper = styled.div`
  position: relative;
  width: 320px;
  height: 80px;

  @media (max-width: 768px) {
    width: 280px;
    height: 70px;
  }

  @media (max-width: 480px) {
    width: 260px;
    height: 65px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const BgIcon = styled(StartButtonBackground)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const StyledStartButton = styled.button`
  border: none;
  width: 320.0px;
  height: 80.0px;

  @media (max-width: 768px) {
    width: 280px;
    height: 70px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 260px;
    height: 65px;
    font-size: 14px;
  }
  text-align: center;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.50);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  background-color: transparent;
  color: white;
  cursor: pointer;
`;

export const ScrollButtonWrapper = styled.button<{ $isOpen: boolean }>`
  width: 58px;
  height: 58px;
  border: 2px solid #464D62;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: ${props => props.$isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    border-color: #6b7280;
  }

  svg {
    color: #FFF;
  }
`;

export const TitleWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 2rem;
`;

export const StyledTitle = styled.h1`
  color: #FFF;
  text-align: center;
  font-size: 84px;

  @media (max-width: 1024px) {
     font-size: 64px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
    max-width: 80%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
  font-style: normal;
  font-weight: 500;
  line-height: 105%;
  letter-spacing: 0.84px;
  max-width: 914px;
  margin: 0 auto;
  transform: translateY(100%);
`;

export const CanvasContainer = styled.div`
margin-top: 86px;
  width: 100%;
  height: 65dvh;
  pointer-events: auto;
  position: absolute;
  z-index: 1;
`;
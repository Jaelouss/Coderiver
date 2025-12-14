import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #19181b;
    color: white;
		margin: 0;
    font-family: "PP Neue Montreal";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  body::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
${normalize}

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    height: 100vh;
    width: 100%;
    font-size: 1.6rem;
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
  }
  
  h1, h2, h3, h4, h5{
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }

  span {
    margin: 0;
  }
  
  button {
    padding: 0;
    cursor: pointer;
  }
  
  ul {
    padding: 0;
    margin: 0;
  }
`;

export default GlobalStyle;

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
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
`

export default GlobalStyle

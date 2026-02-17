// src/globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;

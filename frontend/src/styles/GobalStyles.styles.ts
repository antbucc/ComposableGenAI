// src/styles/GlobalStyles.styles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  input[type="text"], textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;
    border: 2px solid #333;
    border-radius: 5px;
    font-size: 16px;
    color: #333;

    &:focus {
      border-color: orange;
      outline: none;
      box-shadow: 0 0 5px orange;
    }
  }

  textarea {
    resize: vertical;
    min-height: 150px;
  }
`;

export default GlobalStyles;

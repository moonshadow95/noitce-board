import {createGlobalStyle} from "styled-components";
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`
  ${reset}};
  a{
    color: inherit;
    text-decoration: none;
  }
  button {
    border: none;
    background: none;
    padding: 0;
  }
  /*Color*/
  :root {
    --color-black: #333;
    --color-white: #fff;
    --color-ictus: linear-gradient(135deg, #0B53FE, #45DBEA);
    --box-shadow: 0px 6px 8px 1px rgba(0,0,0,0.2);
    --animation-duration: 100ms;
    --border-common: 1px solid #000;
  }
  /*Common*/
  * {
    box-sizing: border-box;
  }
  body{
    font-family: 'Noto Sans KR', 'Noto Sans', sans-serif;
    color: var(--color-black);
  }
  main {
    max-width: 1000px;
    margin: auto;
  }
  .ck-editor__editable,
  .ck-editor__editable:focus {
    width: 100%;
    min-height: 300px !important;
    line-height: 1.4em;
  }
  .ck-editor {
    width: 100% !important;
  }
  .btnContainer{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    padding: 1em 0;
    width: 100%;
    border-top: 1px solid #000;
  }
  .noBorder {
    border:none;
  }
`;

export default globalStyles;
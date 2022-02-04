import {createGlobalStyle} from "styled-components";
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`
  ${reset}
  a {
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
    --box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
    --animation-duration: 100ms;
    --border-common: 1px solid #000;
    --border-radius: 0.2em;
    --button-hover: translate(0.2em, 0.2em);
  }

  /*Common*/
  * {
    box-sizing: border-box;
  }

  body {
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
    width: 90% !important;
  }

  .btnContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    padding: 1em 0;
    width: 100%;
    border-top: 1px solid #000;
  }

  .btnContainer button {
    transition: all var(--animation-duration) ease-in-out;
    box-shadow: var(--box-shadow);
  }

  .btnContainer button:hover {
    transform: var(--button-hover);
    background-color: var(--color-white);
    color: var(--color-black);
  }

  .noBorder {
    border: none;
  }

  // slick
  .slick-slider {
    width: 80%;
    margin-top: 20px;
    margin-bottom: 60px;
  }

  .slick-list {
    border: var(--border-common);
    border-radius: var(--border-radius);
    min-height: 300px;
  }

  .slick-slide {
    border-left: 1px solid #000;
    transform: translateX(-1px);
  }

  .slick-slide:last-child {
    border-right: 1px solid #000;
  }

  .slick-prev,
  .slick-next {
    transform: scale(1.3);
  }

  .slick-prev::before,
  .slick-next::before {
    color: #000;
  }

  .slick-dots {
    bottom: -50px;
  }

  /* Search */
  .searchBtn {
    justify-content: flex-start;
    position: fixed;
    f
    width: 300px;
    top: 6em;
    left: 4em;
    padding: 1em;
    z-index: 9;
  }

  //  map
  @media screen and (max-width: 768px) {
    #myMap {
      width: 81vw !important;
      margin: auto;
      min-height: 45vh !important;
    }

    #menu_wrap {
      margin-left: 4em;
    }
  }

  @media screen and (max-width: 425px) {
    #menu_wrap {
      padding: 2em 0;
      position: static;
    }
  }
`;

export default globalStyles;
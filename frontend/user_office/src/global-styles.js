import { injectGlobal } from 'styled-components';
import gilroyLightWoff from './fonts/Gilroy-Light.woff';
import gilroyLightWoff2 from './fonts/Gilroy-Light.woff2';
import gilroyLightTtf from './fonts/Gilroy-Light.ttf';

import gilroyRegularWoff from './fonts/Gilroy-Regular.woff';
import gilroyRegularWoff2 from './fonts/Gilroy-Regular.woff2';
import gilroyRegularTtf from './fonts/Gilroy-Regular.ttf';

import gilroyMediumWoff from './fonts/Gilroy-Medium.woff';
import gilroyMediumWoff2 from './fonts/Gilroy-Medium.woff2';
import gilroyMediumTtf from './fonts/Gilroy-Medium.ttf';

import gilroyBoldWoff from './fonts/Gilroy-Bold.woff';
import gilroyBoldWoff2 from './fonts/Gilroy-Bold.woff2';
import gilroyBoldTtf from './fonts/Gilroy-Bold.ttf';


import icomoonEot from './fonts/icomoon.eot';
import icomoonWoff from './fonts/icomoon.woff';
import icomoonTtf from './fonts/icomoon.ttf';
import icomoonSvg from './fonts/icomoon.svg';

injectGlobal`

  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  pre {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  a {
    background-color: transparent;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }

  input, textarea, button {

    border: none;
    outline: none;
    background: white;
  }
    
  a {

    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }

  * {
    box-sizing:  border-box;
    padding:  0 0;
    margin:  0 0;
  }

  *:before, *:after {

    box-sizing: border-box;
  }


  a {

      text-decoration: none;
      color: inherit;
      cursor: pointer;
  }
  a:hover {

      color: inherit;
      text-decoration: none;
  }
          
  fieldset {

    border: none;
    outline: none;
    padding: 0 0;
    margin: 0 0;
    display: block;
  }



  ul, li {

    padding: 0 0;
    margin: 0 0;
  }

  ul {
    list-style-type: none;
  }

  * {

    box-sizing: border-box;
    padding: 0 0;
    margin: 0 0;
  }

  *:before, *:after {

    box-sizing: border-box;
  }
    
  html {

    font-size: 62.5%;
    line-height: 62.5%;
    min-height: 100%;
    overflow-x: hidden;
  }
      
  body {

    min-height: 100%;
    font-family: 'gilroy', 'Trebuchet MS', 'Tahoma', 'Arial', 'sans-serif' !important;
    font-weight: 500;
    letter-spacing: .4px;
    font-size: 1.8rem;
    line-height: normal;
    color: #323c47;
    scroll-behavior: smooth;
  }

      
  strong {

    font-weight: 600;
  }
  b {

    font-weight: 700;
  }



  @font-face {
      font-family: 'gilroy';
      src: url(${gilroyLightWoff}) format('woff2'),
          url(${gilroyLightWoff2}) format('woff'),
          url(${gilroyLightTtf}) format('truetype');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'gilroy';
      src: url(${gilroyRegularWoff2}) format('woff2'),
          url(${gilroyRegularWoff}) format('woff'),
          url(${gilroyRegularTtf}) format('truetype');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'gilroy';
      src: url(${gilroyMediumWoff2}) format('woff2'),
          url(${gilroyMediumWoff}) format('woff'),
          url(${gilroyMediumTtf}) format('truetype');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'gilroy';
      src: url(${gilroyBoldWoff2}) format('woff2'),
          url(${gilroyBoldWoff}) format('woff'),
          url(${gilroyBoldTtf}) format('truetype');
      font-weight: 600;
      font-style: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'icomoon';
      src:  url(${icomoonEot}?18elz6);
      src:  url(${icomoonEot}?18elz6#iefix) format('embedded-opentype'),
        url(${icomoonWoff}?18elz6) format('woff'),
        url(${icomoonTtf}?18elz6) format('truetype'),
        url(${icomoonSvg}?18elz6#icomoon) format('svg');
        font-weight: normal;
        font-style: normal;
  }


  [class^="icon-"], [class*=" icon-"] {

    font-family: 'icomoon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

`;

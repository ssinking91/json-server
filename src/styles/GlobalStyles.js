import { createGlobalStyle } from "styled-components";
import reset from "styled-reset"; // style-reset 패키지

const GlobalStyles = createGlobalStyle`
    ${reset}
  * {
    box-sizing: border-box; //테두리와 안쪽 여백의 크기도 요소의 크기로 고려
  }
  body {
    background-color: #ffffff;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  }
    // rem의 "r"은 바로 "root(최상위)"를 뜻합니다. 
    // 최상위 태그(요소)에 지정한 것을 기준으로 삼으며, 보통 최상위 태그는 html태그
  html {
    font-size: 10px; 
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ::-webkit-scrollbar {
      display: none;
  }
  input, textarea {
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
  }
  input {
      border: none;
      outline: none;
  }
  button {
      border: none;
      outline: none;
      background: none;
      padding: 0;
      cursor: pointer;
  }
  h1, h2, h3, h4, h5, h6{
    font-family:'Maven Pro', sans-serif;
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyles;

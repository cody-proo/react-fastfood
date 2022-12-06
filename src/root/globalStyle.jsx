import { createGlobalStyle } from "styled-components";
import iransans from "../assets/fonts/iransans.woff2";

const GlobalStyle = createGlobalStyle(() => ({
  "@font-face": {
    src: `url('${iransans}')`,
    fontFamily: "iransans",
  },
  body: {
    fontFamily: "iransans",
    direction: "rtl",
    overflowX: "hidden",
  },
  "*": {
    listStyle: "none",
    textDecoration: "none",
    color: "#444",
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    outline: "none",
  },
}));

export default GlobalStyle;

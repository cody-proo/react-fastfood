import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle(() => ({
  body: {
    fontFamily: "roboto",
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

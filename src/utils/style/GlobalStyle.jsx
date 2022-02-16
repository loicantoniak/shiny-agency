import React from "react";
import { createGlobalStyle } from "styled-components";
import useTheme from "../hooks/useTheme"

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }

    body {
        background-color: ${({ isDarkMode }) =>
          isDarkMode ? "black" : "white"};
        margin: 0;  
    }
`;

export default function GlobalStyle() {
  const { theme } = useTheme()

  return <StyledGlobalStyle isDarkMode={theme === "dark"} />;
}

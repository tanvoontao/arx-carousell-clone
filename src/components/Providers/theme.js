import { createTheme, css } from "@mui/material/styles";

// color palette: https://coolors.co/palette/000000-14213d-fca311-e5e5e5-ffffff

export const lightTheme = createTheme({
  palette: {
    primary: { main: "#14213d" },
    secondary: { main: "#000000" },
    mode: "light",
  },
});


export const darkTheme = createTheme({
  palette: {
    primary: { main: "#fca311" },
    secondary: { main: "#14213d" },
    mode: "dark",
  },
});


export const globalStyles = css`
    :root {
      body {
        background-color: #fff;
        color: #121212;
      }
    }
    [class="dark"] {
      body {
        background-color: #121212;
        color: #fff;
      }
    }
  `;

  // data-theme="dark"
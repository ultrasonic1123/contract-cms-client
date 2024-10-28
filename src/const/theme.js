import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4597d1", // Màu chính
    },
    secondary: {
      main: "#03dac6", // Màu phụ
    },
    background: {
      default: "#f5f5f5", // Màu nền
    },
  },
});

export default theme;

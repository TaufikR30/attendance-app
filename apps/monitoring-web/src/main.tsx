import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const qc = new QueryClient();

const theme = createTheme({
  typography: { fontSize: 14 },
  components: {
    MuiTextField: { defaultProps: { fullWidth: true } },
    MuiToolbar: {
      styleOverrides: {
        root: { minHeight: 56, "@media (min-width:600px)": { minHeight: 64 } },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={qc}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

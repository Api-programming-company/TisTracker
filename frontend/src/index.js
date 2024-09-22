import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/store";
import { AppProvider } from "./context/AppContext";
import ValidStateProvider from "./context/validDataPlanification/ValidState";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Main() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AppProvider>
        <ValidStateProvider>
          <App toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </ValidStateProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();

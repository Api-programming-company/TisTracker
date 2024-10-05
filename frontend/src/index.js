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
import { PlanningProvider } from "./context/PlanningContext";
import EvaluateProvider from "./context/evaluateContext/EvaluateProvider";

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
      <PlanningProvider>
        <AppProvider>
          <EvaluateProvider>
            <App toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          </EvaluateProvider>
        </AppProvider>
      </PlanningProvider>
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

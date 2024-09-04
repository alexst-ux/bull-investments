import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import isPropValid from "@emotion/is-prop-valid";
import { Toaster } from "react-hot-toast";
import { StyleSheetManager } from "styled-components";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Holdings from "./pages/Holdings";
import Portfolios from "./pages/Portfolios";
import { DarkModeProvider } from "./context/DarkModeContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import Portfolio from "./pages/Portfolio";
import Signup from "./pages/Signup";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: true, staleTime: 10 * 1000 },
  },
});

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName, target) {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
}

function App() {
  return (
    <DarkModeProvider>
      <CurrencyProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <BrowserRouter>
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="portfolios" element={<Portfolios />} />
                  <Route
                    path="portfolios/:portfolioId"
                    element={<Portfolio />}
                  />
                  <Route path="holdings" element={<Holdings />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="account" element={<Account />} />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </StyleSheetManager>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },

              error: {
                duration: 3000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </CurrencyProvider>
    </DarkModeProvider>
  );
}

export default App;

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const CurrencyContext = createContext();

function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useLocalStorageState("USD", "currency");

  function toggleCurrency(value) {
    setCurrency(value);
  }

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("CurrencyContext is used outside of CurrencyProvider");

  return context;
}

export { CurrencyProvider, useCurrency };

import { useState } from "react";
import Button from "../ui/Button";
import { getHistoryExchData } from "../services/apiCurrencyExchange";

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function getStockCurrencies() {
    setIsLoading(true);
    await getHistoryExchData(null, "EUR");
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>
      <Button onClick={getStockCurrencies} disabled={isLoading}>
        Get Stock Currencies
      </Button>
    </div>
  );
}

export default Uploader;

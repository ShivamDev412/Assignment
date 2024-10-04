
export type CurrencyRatesResponse = {
  success: boolean;
  terms: string;
  privacy: string;
  timestamp: number;
  source: string;
  quotes: {
    [key: string]: number;
  };
};
const getCurrencyRates = async (): Promise<CurrencyRatesResponse> => {
  try {
    const res = await fetch(
      `https://api.currencylayer.com/live?access_key=${process.env.CURRENCY_LAYER_API_KEY}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch currency rates: ${res.statusText}`);
    }
    const data = await res.json();
    return data as CurrencyRatesResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching currency rates: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export { getCurrencyRates };

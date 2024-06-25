"use client";

import { CurrencyItem } from "@/types";
import { useState } from "react";

type Props = {
  data: CurrencyItem[];
  currencyConverter: (
    amount: number,
    symbol: string,
    convert: string
  ) => Promise<number>;
};

export default function Conversion({ data, currencyConverter }: Props) {
  const [amount, setAmount] = useState<number>();
  const [fromSymbol, setFromSymbol] = useState("BTC");
  const [toSymbol, setToSymbol] = useState("ETH");
  const [error, setError] = useState(null);
  const [result, setResult] = useState<number | null>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!amount) return;
    setResult(null);
    setLoading(true);
    try {
      const res = await currencyConverter(amount, fromSymbol, toSymbol);
      setResult(res);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-md w-full lg:w-[450px]">
        <h1 className="text-center text-2xl font-bold py-6">
          Currency Converter
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="symbol" className="font-bold">
              From
            </label>
            <select
              id="symbol"
              name="symbol"
              value={fromSymbol}
              onChange={(e) => {
                setFromSymbol(e.target.value);
                setResult(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md mt-2"
            >
              {data.map((currency, index) => (
                <option key={index} value={currency.symbol}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="convert" className="font-bold">
              To
            </label>
            <select
              id="convert"
              name="convert"
              value={toSymbol}
              onChange={(e) => {
                setToSymbol(e.target.value);
                setResult(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md mt-2"
            >
              {data.map((currency, index) => (
                <option key={index} value={currency.symbol}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="font-bold">
              Amount
            </label>
            <div>
              <input
                id="amount"
                name="amount"
                type="text"
                value={amount}
                className="px-4 py-2 border border-gray-300 rounded-md mt-2 w-full"
                onChange={(e) => {
                  setAmount(+e.target.value);
                  setResult(null);
                }}
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-black text-white px-4 py-3 rounded-md flex justify-center"
            >
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Convert"
              )}
            </button>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {result && !loading && (
            <p className="text-green-600 text-center">
              {amount} {fromSymbol} is equal to {result.toFixed(2)} {toSymbol}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

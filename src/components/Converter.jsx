import React from "react";
import { useState, useEffect } from "react";
import Result from "./Result";
import axios from "axios";

const useRatesData = () => {
  const [ratesStore, setRatesData] = useState({
    state: "loading",
  });
  console.log("ratesStore", ratesStore);

  useEffect(() => {
    const getRates = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate.host/latest?base=USD&symbols=USD,CHF,EUR,RUB,CZK,SEK,CNY,UAH,JPY`
        );
        console.log(response.data);

        const { rates, date } = await response.data;

        setRatesData({
          state: "success",
          rates,
          date,
        });
      } catch {
        setRatesData({
          state: "error",
        });
      }
    };
    setTimeout(getRates, 2000);
  }, []);

  return ratesStore;
};

const Converter = () => {
  const [result, setResult] = useState();
  const ratesData = useRatesData();

  const calculateResult = (currency, amount) => {
    const rate = ratesData.rates[currency];
    console.log("rate", rate);
    setResult({
      sourceAmount: +amount,
      targetAmount: amount * rate,
      currency,
    });
  };

  const [currency, setCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");



  const onSubmit = (event) => {
    event.preventDefault();
    calculateResult(currency, amount);
  };

  const onReset = (event) => {
    event.preventDefault();
    setAmount("");
    setResult();
    // setCurrency("EUR");
  };

  return (
    <section className="pt-14 bg-white pb-14 px-6 shadow">
      <h1 className="text-black text-2xl mb-10 font-semibold">
        Currency Exchange Rate
      </h1>
      <form onSubmit={onSubmit}>
        {ratesData.state === "loading" ? (
          <div className="flex items-center justify-center">
            <div
              className=" animate-bounce size-5xl inline-block w-60 h-60 border-4  border-green-600 rounded-full"
              role="status"
            >
              <span className=" absolute  text-5xl mt-20 ml-2 font-semibold">
                Loading...
              </span>
            </div>
          </div>
        ) : ratesData.state === "error" ? (
          "error"
        ) : (
          <div className="flex flex-row mb-9 gap-9 items-center">
            <div className="flex-1">
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  value={amount}
                  name="price"
                  onChange={({ target }) => setAmount(target.value)}
                  min="1"
                  max="10000000"
                  id="price"
                  className="
                pr-3 focus:outline-none focus:ring-1 focus:ring-green-500 
                focus:border-green-500 w-full 
                border-2 rounded-sm min-h-50 pl-3 py-2
                z-10 mt-1  bg-white shadow-lg max-h-56 text-base 
                ring-1ring-black ring-opacity-5 overflow-auto sm:text-sm
                  block  pl-7 pr-12 "
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="currency" className="sr-only">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={currency}
                    onChange={({ target }) => setCurrency(target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-6 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                  >
                    {Object.keys(ratesData.rates).map((currency) => (
                      <option key={currency} value={currency.base}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <button
                type="submit"
                className="mr-7 inline-flex justify-center py-3 px-5 border border-transparent
                       shadow-sm text-md font-bold rounded-md text-white
                       bg-green-300 hover:bg-green-500"
              >
                Convert
              </button>
              <button
                type="reset"
                onClick={onReset}
                className="inline-flex justify-center py-3 px-5 border border-transparent
                     shadow-sm text-md font-bold rounded-md text-white bg-red-300
                     hover:bg-red-600"
              >
                Reset
              </button>
            </div>

            <div className="flex-1">
              <div>
                <h1
                  className="border-2 border-green-500 w-full 
           rounded-sm min-h-50 pl-3 pr-10 py-2 font-semibold"
                >
                  You receive:{" "}
                  {<Result result={result} calculateResult={calculateResult} />}
                </h1>
              </div>
            </div>
          </div>
        )}
      </form>
      <div className="flex justify-between mt-10 items-center">
        <div>
          <p className="flex items-center text-xs font-regular text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            &nbsp;Be careful keep your money under your pillow.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Converter;

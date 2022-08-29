import  { useEffect, useState } from "react";
import axios from "axios";

export const useRatesData = () => {
    const [ratesStore, setRatesData] = useState({
      state: "loading",
    });
    console.log('ratesStore',ratesStore)
  
    useEffect(() => {
      const getRates = async () => {
        try {
          const response = await axios.get(
            `https://api.exchangerate.host/latest?base=UAH&symbols=USD,CHF,EUR,RUB,CZK,SEK,CNY,UAH,JPY`
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
  

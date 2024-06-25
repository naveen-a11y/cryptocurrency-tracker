import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Conversion from "@/components/conversion";
import { getAllCryptoCurrencies } from "@/utils/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptocurrency Converter | Convert BTC, ETH, LTC, and more",
  description:
    "Instantly convert between popular cryptocurrencies like Bitcoin, Ethereum, Litecoin, and others. Get the latest exchange rates and convert your crypto assets with our easy-to-use converter tool.",
  alternates: {
    canonical:
      "https://cryptocurrency-tracker-green.vercel.app/crypto-converter",
  },
};

export default async function CryptoConverter() {
  const data = await getAllCryptoCurrencies();

  const currencyConverter = async (
    amount: number,
    symbol: string,
    convert: string
  ) => {
    "use server";
    const url = `${endpoints.getConversion}?amount=${amount}&symbol=${symbol}&convert=${convert}`;
    try {
      const { data } = await http().get(url);
      return data.quote[convert].price;
    } catch (error) {
      console.log(error);
    }
  };

  return <Conversion data={data} currencyConverter={currencyConverter} />;
}

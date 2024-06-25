import { endpoints } from "./endpoints";
import http from "./http";

export const getAllCryptoCurrencies = async () => {
  try {
    const { data } = await http().get(endpoints.getLatestCryptocurrencies);
    return data;
  } catch (error) {
    console.log(error);
  }
};

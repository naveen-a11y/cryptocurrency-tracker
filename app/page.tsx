import { getAllCryptoCurrencies } from "@/utils/services";
import { CurrencyItem } from "@/types";

export default async function Home() {
  const data = await getAllCryptoCurrencies();

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl p-4 mx-auto">
        <h1 className="text-center text-2xl font-bold py-8">
          All Cryptocurrencies
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50">
              <tr className="text-left">
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Symbol
                </th>
                <th scope="col" className="px-6 py-3">
                  Price (USD)
                </th>
                <th scope="col" className="px-6 py-3">
                  Market Cap (USD)
                </th>

                <th scope="col" className="px-6 py-3">
                  24h Change (%)
                </th>
                <th scope="col" className="px-6 py-3">
                  7d Change (%)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: CurrencyItem) => (
                <tr
                  key={item.id}
                  className="odd:bg-gray-100 even:bg-gray-50 even:dark:bg-gray-50"
                >
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.symbol}</td>
                  <td className="px-6 py-4">
                    ${item.quote.USD.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    ${item.quote.USD.market_cap.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      item.quote.USD.percent_change_24h > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.quote.USD.percent_change_24h.toFixed(2)}%
                  </td>
                  <td
                    className={
                      item.quote.USD.percent_change_7d > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {item.quote.USD.percent_change_7d.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

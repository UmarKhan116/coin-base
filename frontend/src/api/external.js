import axios from "axios";

const NEWS_API_ENDPOINT =
  "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json";

export const getNews = async () => {
  debugger;
  let response;
  try {
    response = await axios.get(NEWS_API_ENDPOINT);
    response = response.data.articles.slice(0, 15);
  } catch (error) {
    console.error(error);
  }
  return response;
};

const CRYPTO_API_ENDPOINT = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h&locale=en&precision="

export const getCryptoData = async () => {
  debugger;
  let res;
  try {
    res = await axios.get(CRYPTO_API_ENDPOINT);
    res = res.data
  } catch (error) {
    console.error(error)
  }
  return res
};

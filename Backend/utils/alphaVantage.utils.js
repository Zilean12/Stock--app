const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const fetchStockData = async (stockSymbol) => {
  // const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stock data for ${stockSymbol}:`, error);
    throw error;
  }
};

module.exports = {
  fetchStockData,
};

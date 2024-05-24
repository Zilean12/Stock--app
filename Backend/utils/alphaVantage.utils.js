const axios = require('axios');

const alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY;

// Function to fetch stock data from Alpha Vantage API
const fetchStockData = async (stockSymbol) => {
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${alphaVantageApiKey}`;
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
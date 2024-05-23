const { fetchStockData } = require('../utils/alphaVantage.utils');

const getStockData = async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const data = await fetchStockData(symbol);
    console.log('Data fetched from Alpha Vantage:', data);  // Debugging line
    res.json(data);
  } catch (error) {
    console.error('Error in getStockData:', error);  // Debugging line
    res.status(500).send('Error fetching stock data');
  }
};

module.exports = {
  getStockData,
};

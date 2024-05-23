import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';

const StockDashboard = () => {
  const { userName, authToken } = useContext(AuthContext); // Get authToken from AuthContext
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState<any>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchStockData = async () => {
    if (!symbol) {
      setError('Stock symbol cannot be empty');
      return;
    }
    try {
      const response = await axios.get(`/api/stocks/${symbol}`);
      console.log('Response data:', response.data);

      const timeSeries = response.data['Time Series (5min)'];
      if (!timeSeries) {
        throw new Error('No time series data found');
      }

      const latestTime = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTime];

      const openPrice = parseFloat(latestData['1. open']);
      const closePrice = parseFloat(latestData['4. close']);
      const volume = parseInt(latestData['5. volume']);

      const gainLoss = closePrice - openPrice;
      const gainLossPercentage = ((closePrice - openPrice) / openPrice) * 100;

      const stockInfo = {
        symbol,
        price: openPrice.toFixed(4),
        change: gainLoss.toFixed(4),
        gainOrLoss: gainLoss > 0 ? 'Gain' : 'Loss',
        gainLossPercentage: gainLossPercentage.toFixed(2),
        volume,
        open: openPrice.toFixed(4),
        high: parseFloat(latestData['2. high']).toFixed(4),
        low: parseFloat(latestData['3. low']).toFixed(4),
        close: closePrice.toFixed(4)
      };

      setStockData(stockInfo);
      setError('');
    } catch (error) {
      console.error('Error fetching or parsing stock data:', error);
      setError('Error fetching or parsing stock data');
      setStockData(null);
    }
  };

  const addToWatchlist = async () => {
    if (!stockData || !stockData.symbol) {
      setMessage('No stock data available to add to watchlist');
      return;
    }
    try {
      if (!authToken) {
        throw new Error('No authentication token found');
      }
      const response = await axios.post(
        'http://localhost:3000/api/watch/watchlist',
        { symbols: [stockData.symbol] }, // Send an array containing the symbol
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      if (response.status === 200) {
        setMessage('Stock added to watchlist');
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding stock to watchlist:', error);
      setMessage('Error adding stock to watchlist');
    }
  };
  
  useEffect(() => {
    const intervalId = setInterval(fetchStockData, 600000); // Fetch data every 10 minutes
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStockData();
  };

  return (
    <div>
      <h1>Stock Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter stock symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button type="submit">Get Stock Data</button>
      </form>
      {error && <p>{error}</p>}
      {stockData && (
        <div>
          <h2>{stockData.symbol.toUpperCase()} Stock Data</h2>
          <p>Symbol: {stockData.symbol}</p>
          <p>Price: ${stockData.price}</p>
          <p>Change: {stockData.change}</p>
          <p>Gain/Loss: {stockData.gainOrLoss} ({stockData.gainLossPercentage}%)</p>
          <p>Volume: {stockData.volume}</p>
          <p>Open: ${stockData.open}</p>
          <p>High: ${stockData.high}</p>
          <p>Low: ${stockData.low}</p>
          <p>Close: ${stockData.close}</p>
          <button onClick={addToWatchlist}>Add to Watchlist</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default StockDashboard;

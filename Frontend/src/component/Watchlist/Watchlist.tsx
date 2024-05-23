import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';

const Watchlist = () => {
  const { authToken } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState<any[]>([]);

  const fetchWatchlist = async () => {
    try {
      if (!authToken) {
        throw new Error('No authentication token found');
      }
      const response = await axios.get<string[]>('http://localhost:3000/api/watch/watchlist', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status === 200) {
        setWatchlist(response.data);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        setError('Error fetching watchlist');
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      setError('Error fetching watchlist');
    } finally {
      setLoading(false);
    }
  };

  const fetchStockData = async (symbol: string) => {
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

      const stockInfo = {
        symbol,
        price: openPrice.toFixed(4),
        high: parseFloat(latestData['2. high']).toFixed(4),
        gainLoss: gainLoss.toFixed(4),
        close: closePrice.toFixed(4),
        date: latestTime.split(' ')[0],
        time: latestTime.split(' ')[1]
      };

      setStockData(prevStockData => [...prevStockData, stockInfo]);
    } catch (error) {
      console.error('Error fetching or parsing stock data:', error);
      setError('Error fetching or parsing stock data');
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  useEffect(() => {
    if (watchlist.length > 0) {
      setStockData([]);
      watchlist.forEach(symbol => fetchStockData(symbol));
    }
  }, [watchlist]);

  return (
    <div>
      <h1>Your Watchlist</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && watchlist.length === 0 && <p>No stocks in your watchlist.</p>}
      {!loading && !error && watchlist.length > 0 && (
        <div>
          {stockData.map((stock, index) => (
            <div key={index}>
              <h2>{stock.symbol}</h2>
              <p>Price: ${stock.price}</p>
              <p>High: ${stock.high}</p>
              <p>Gain/Loss: {stock.gainLoss}</p>
              <p>Close: ${stock.close}</p>
              <p>Date: {stock.date}</p>
              <p>Time: {stock.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;

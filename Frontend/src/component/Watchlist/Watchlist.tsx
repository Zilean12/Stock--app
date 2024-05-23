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

      // Check if symbol already exists in stockData array
      if (!stockData.some(stock => stock.symbol === symbol)) {
        setStockData(prevStockData => [...prevStockData, stockInfo]);
      }
    } catch (error) {
      console.error('Error fetching or parsing stock data:', error);
      setError('Error fetching or parsing stock data');
    }
  };

  const removeFromWatchlist = async (symbol: string) => {
    try {
      if (!authToken) {
        throw new Error('No authentication token found');
      }
      const response = await axios.delete(
        'http://localhost:3000/api/watch/watchlist',
        {
          headers: { Authorization: `Bearer ${authToken}` },
          data: { symbol },
        }
      );
      if (response.status === 200) {
        setWatchlist(prevWatchlist => prevWatchlist.filter(item => item !== symbol));
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        setError('Error removing stock from watchlist');
      }
    } catch (error) {
      console.error('Error removing stock from watchlist:', error);
      setError('Error removing stock from watchlist');
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  useEffect(() => {
    if (watchlist.length > 0) {
      setStockData([]); // Clear stockData before fetching new data
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
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Symbol</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Price</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>High</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Gain/Loss</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Close</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Time</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{stock.symbol}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{stock.price}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{stock.high}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{stock.gainLoss}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{stock.close}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{stock.date}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{stock.time}</td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button onClick={() => removeFromWatchlist(stock.symbol)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Watchlist;

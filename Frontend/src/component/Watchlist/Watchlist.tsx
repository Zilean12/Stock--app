import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import './Watchlist.css';

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
      // const volume = parseInt(latestData['5. volume']);

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
      setStockData(prevStockData => {
        const existingStock = prevStockData.find(stock => stock.symbol === symbol);
        if (existingStock) {
          return prevStockData.map(stock => stock.symbol === symbol ? stockInfo : stock);
        } else {
          return [...prevStockData, stockInfo];
        }
      });
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
        setStockData(prevStockData => prevStockData.filter(stock => stock.symbol !== symbol));
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
    <div className="watchlist-container">
      <h1>Your Watchlist</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && watchlist.length === 0 && <p>No stocks in your watchlist.</p>}
      {!loading && !error && watchlist.length > 0 && (
        <table className="watchlist-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>High</th>
              <th>Gain/Loss</th>
              <th>Close</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((stock, index) => (
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.price}</td>
                <td>{stock.high}</td>
                <td>
                  {stock.gainLoss >= 0 ? (
                    <span className="gain">↑ +{stock.gainLoss}</span>
                  ) : (
                    <span className="loss">↓ {stock.gainLoss}</span>
                  )}
                </td>
                <td>{stock.close}</td>
                <td>{stock.date}</td>
                <td>{stock.time}</td>
                <td>
                  <button className="remove-button" onClick={() => removeFromWatchlist(stock.symbol)}>Remove</button>
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

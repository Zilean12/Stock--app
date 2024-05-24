import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './StockDashboard.css';

import AuthContext from '../../contexts/AuthContext';

const StockDashboard = () => {
  const { userName, authToken } = useContext(AuthContext);
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [timeSeries, setTimeSeries] = useState<any>(null);

  const fetchStockData = async () => {
    if (!symbol) {
      setError('Stock symbol cannot be empty');
      return;
    }
    try {
      const response = await axios.get(`/api/stocks/${symbol}`);
      console.log('Response data:', response.data);

      const fetchedTimeSeries = response.data['Time Series (5min)'];
      if (!fetchedTimeSeries) {
        throw new Error('No time series data found');
      }

      setTimeSeries(fetchedTimeSeries);

      const latestTime = Object.keys(fetchedTimeSeries)[0];
      const latestData = fetchedTimeSeries[latestTime];

      setLastUpdate(new Date().toLocaleString()); // Update last update time
      setError('');
      setStockData({ symbol, latestData });
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
        { symbols: [stockData.symbol] },
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
      {timeSeries && (
        <div style={{ margin: '0 auto', maxWidth: '90%' }}>
          <h2>{symbol.toUpperCase()} Stock Data</h2>
          <button onClick={addToWatchlist}>Add to Watchlist</button>
          <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed', marginTop: '10px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Symbol</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Open</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Close</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Volume</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>High</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Low</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Gain/Loss</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(timeSeries).slice(0, 15).map((time) => {
                const data = timeSeries[time];
                const gainLoss = parseFloat(data['4. close']) - parseFloat(data['1. open']);
                const isGain = gainLoss > 0;
                const arrow = isGain ? <span style={{ color: 'green' }}>↑</span> : <span style={{ color: 'red' }}>↓</span>;
                const gainLossValue = isGain ? <span style={{ color: 'green' }}>+{Math.abs(gainLoss).toFixed(4)}</span> : <span style={{ color: 'red' }}>-{Math.abs(gainLoss).toFixed(4)}</span>;
                return (
                  <tr key={time}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{symbol}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{parseFloat(data['1. open']).toFixed(4)}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{parseFloat(data['4. close']).toFixed(4)}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{parseInt(data['5. volume']).toLocaleString()}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{parseFloat(data['2. high']).toFixed(4)}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{parseFloat(data['3. low']).toFixed(4)}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {arrow} {gainLossValue}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{new Date(time).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {message && <p>{message}</p>}
      <p>Last updated: {lastUpdate}</p>
    </div>
  );
};

export default StockDashboard;

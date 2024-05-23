import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Watchlist.css';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [newSymbol, setNewSymbol] = useState('');
  const [error, setError] = useState('');

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/watch/watchlist');
      setWatchlist(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      setError('Error fetching watchlist');
    }
  };

  const addToWatchlist = async () => {
    if (!newSymbol) {
      setError('Stock symbol cannot be empty');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/watch/watchlist', { symbols: [newSymbol] });
      fetchWatchlist();
      setNewSymbol('');
      setError('');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      setError('Error adding to watchlist');
    }
  };

  const removeFromWatchlist = async (symbol: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/watch/watchlist/${symbol}`);
      fetchWatchlist();
      setError('');
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      setError('Error removing from watchlist');
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addToWatchlist();
  };

  return (
    <div>
      <h2>Watchlist</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Enter stock symbol"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {watchlist.map((symbol) => (
          <li key={symbol}>
            {symbol}
            <button onClick={() => removeFromWatchlist(symbol)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;

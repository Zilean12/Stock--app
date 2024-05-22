const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRouter = require('./routes/auth.route');
const stockRouter = require('./routes/stock.route');
const watchlistRouter = require('./routes/watchlist.route'); // Correct the path

dotenv.config();
const app = express();
const port = process.env.PORT || 3000; // Use port 3000 for your setup

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/stocks', stockRouter);
app.use('/api/watch', watchlistRouter); // Correct the path

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Global Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message, 
  });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

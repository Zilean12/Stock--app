# Stock Monitoring Platform

The Stock Monitoring Platform is a full-stack web application that allows users to create and manage their stock watchlists, and monitor the latest stock prices for the stocks in their watchlists. The application is built using React with TypeScript for the frontend, and Node.js with Express for the backend.

## Features

- User registration and authentication
- Creating and managing stock watchlists
- Fetching and displaying the latest stock prices for the stocks in the user's watchlist
- Integration with the Alpha Vantage API for fetching stock data
- Responsive user interface built with Material-UI

## Technologies Used

### Frontend

- React
- TypeScript
- Material-UI
- Axios

### Backend

- Node.js
- Express
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication
- Alpha Vantage API

## Installation

1. Clone the repository: https://github.com/Zilean12/Stock--app.git

2. Navigate to the project directory:
cd stock-monitoring-platform

3. Install dependencies for the frontend:
cd frontend
npm install

4. Install dependencies for the backend:
cd backend
npm install

5. Set up the environment variables:
- Create a `.env` file in the `backend` directory
- Add the following variables and provide the appropriate values:
  - `MONGODB_URI`: URI for your MongoDB connection
  - `JWT_SECRET`: Secret key for JSON Web Token (JWT) authentication
  - `ALPHA_VANTAGE_API_KEY`: Your Alpha Vantage API key

6. Start the frontend development server:
cd frontend
npm run dev

7. Start the backend server:
cd backend
npm start

8. Open your web browser and navigate to `http://localhost:3000` to access the Stock Monitoring Platform.

## Usage

1. Register a new user account or log in with an existing account.
2. Add stocks to your watchlist by searching for stock symbols.
3. View the latest stock prices for the stocks in your watchlist on the dashboard.
4. Manage your watchlist by adding or removing stocks.


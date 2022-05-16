import React from 'react';
import ReactDOM from 'react-dom';
import { setGlobal } from "reactn"
import './index.css';
import App from './App';

setGlobal({
  account: null, 
  selectedAsset: "",
  watchlist: [],
  positions: [],
  orders: [],
  levels: {},
  rules: [],
  candles: {},
  inflections: {}, 
  symbols: [], // this will hold a combination of watchlist and positions symbols for subscription to socket for price updates
  symbolsDetails: [], //this will hold details of all assets in watchlist and positions, including current holdings
  updatePositions: 1,
  updateOrders: 1
})




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

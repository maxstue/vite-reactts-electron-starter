//const event = require("./sock").event;
const groupBy = require("lodash.groupby");

const candleReducer = function (
  { S, o, h, l, c, cpv, cvol, vwap, v, ts, tg },
  trade,
  index,
  trades
) {
  let price = Number(trade.price);
  return {
    S: index === trades.length - 1 ? trade.symbol : S, //symbol
    o: index === 0 ? price : o, //open
    h: Math.max(h, price), //high
    l: index === 0 ? price : Math.min(l, price), //low
    c: price, //close
    p: price, //close or last price
    v: v + Number(trade.size), //volume of the candle
    cpv:
      ((Math.max(h, price) + Math.min(l, price) + price) / 3) *
        Number(trade.size) +
      cpv, //cumulative price volume, used for vwap calculation
    cvol: index === trades.length - 1 ? Number(trade.cvol) : cvol, //cumulative volume from broker
    vwap: Number(trade.vwap) || 0, 
    ts: index === 0 ? Math.floor(Number(trade.date)) : ts, //time of first trade in this candle- unix timestamp
    tg: Date.now(), // time the candle was generated - unix timestamp
  };
};

const initialCandleValues = {
  S: "",
  o: 0,
  h: 0,
  l: 0,
  c: 0,
  p: 0,
  v: 0,
  cpv: 0,
  cvol: 0,
  vwap: 0,
  ts: 0,
  tg: 0,
};

module.exports = function (paramsObject) {
  let {
    pipeIn,
    pipeInChannel,
    pipeOut,
    pipeOutChannel,
    interval,
    dataMapping,
  } = paramsObject;
  //TODO: If no pipe or emitter was passed in, throw error

  //Initialize default params
  let name = pipeOutChannel || "ohlcv-30s"; //the name of the subscription that will be published
  interval = interval || 30 * 1000; //in milliseconds
  let emitter = pipeOut || pipeIn;
  pipeInChannel = pipeInChannel || "trades";

  //Initialize variables
  let intervalsCache = {}; //should contain two items max - previous interval and current interval
  let intervalBase,
    startOfInterval = 0;
  let intervalStarts = [];

  if (pipeIn) {
    pipeIn.on(pipeInChannel, (message) => {
      if (dataMapping) {
        message.price = message[dataMapping.price];
        message.size = message[dataMapping.size];
        message.date = message[dataMapping.date];
        message.symbol = message[dataMapping.symbol];
        message.vwap = message[dataMapping.vwap]
      }

      //If date comes in as an ISO string, convert to unix timestamp 
      if ( typeof(message.date) != "number") message.date = Math.floor(new Date(message.date).getTime())
      //console.log("message date", message.date)
      
      //Get the base time for the current interval based on the current message
      intervalBase = Math.floor(message.date / interval);
      //console.log("interval base", intervalBase)
  
      //Get the start of the current interval
      startOfInterval = intervalBase * interval;
      //console.log("start of interval", startOfInterval)
  
      //If no data exists for the new interval, initialize an empty array
      if (!Array.isArray(intervalsCache[startOfInterval]))
        intervalsCache[startOfInterval] = [];
      
      //For every message that comes in, save into the array of the current interval
      //TODO: filter out data whose timestamp does not match the current interval
      //TODO: save data out of the current interval for future review
      intervalsCache[startOfInterval].push(message);

      //Once we have multiple items in intervalsCache, process and delete previous items starting from the first...
      if (Object.keys(intervalsCache).length > 1) {
        //Get the data of the previous interval
        let previousInterval = Object.values(intervalsCache)[0];
  
        //Convert data into array of arrays grouped by the symbol
        previousInterval = groupBy(previousInterval, "symbol");
        previousInterval = Object.values(previousInterval);
  
        //Compute and emit OHLCV candle for each symbol
        previousInterval.map((symbolData) => {
          let ohlcvCandle = symbolData.reduce(candleReducer, initialCandleValues);
          ohlcvCandle["i"] = name;
          if (emitter && emitter.send) { 
            emitter.send(name, ohlcvCandle)
          } else {
            emitter.emit(name, ohlcvCandle);
          }
        });
  
        //Remove the previous interval
        delete intervalsCache[Object.keys(intervalsCache)[0]];
      }
    });
  }
  
};

//candleAggregator(socket.emit, "60seconds", 60 * 1000);

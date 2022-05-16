const Alpaca = require("@alpacahq/alpaca-trade-api")

// const alpaca = new Alpaca({
//   keyId: process.env.ALPACA_KEY,
//   secretKey: process.env.ALPACA_SECRET,
//   usePolygon: false
// })


const alpaca = new Alpaca({
  keyId: process.env.ALPACA_KEY,
  secretKey: process.env.ALPACA_SECRET,
  paper: (process.env.NODE_ENV == "development")
})

module.exports = alpaca
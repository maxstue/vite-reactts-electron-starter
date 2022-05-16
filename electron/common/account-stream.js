const { AlpacaStream } = require("@master-chief/alpaca")

const account = new AlpacaStream({
    credentials: {
        key: process.env.ALPACA_KEY,
        secret: process.env.ALPACA_SECRET,
        paper: true
    },
    type: "account"
})

module.exports = account
const alpaca = require("./electron/common/alpaca")

alpaca.getWatchlists().then(response => console.log(response))
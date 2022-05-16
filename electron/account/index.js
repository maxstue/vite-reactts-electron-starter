const alpaca = require(".././common/conn")

const getAccountDetails = async function() {
    const account = await alpaca.getAccount()
    return account
}

module.exports = getAccountDetails


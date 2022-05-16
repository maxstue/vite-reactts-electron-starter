module.exports = (data, rds) => {
    return new Promise (async (resolve, reject) => {
        console.log(data)
        const result = await rds.HSET(data.symbol, {"rules": JSON.stringify(data.rules)}, (err, success) => {
            console.log("success", success)
            console.log("error", err)
        })
        console.log(result)
        if (result) resolve(result)
        reject("Could not update rules for " + data.symbol)
    })
}
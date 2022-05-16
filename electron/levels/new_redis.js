module.exports = (data, client) => {
    return new Promise ( async (resolve, reject) => {
       
        let existing = await client.HGET(data.symbol, "levels");
        if ( ! existing ) {
            await client.HSET(data.symbol, {"levels": JSON.stringify([data])}, (err, success) => {
                reject(err);
                resolve(success)
            });
        } else {
            existing = JSON.parse(existing)
            const newData = [...existing, data]
            await client.HSET(data.symbol, {"levels": JSON.stringify(newData)}, (err, success) => {
                reject(err);
                resolve(success)
            })
        }
    })
  }
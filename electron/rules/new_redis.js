module.exports = (data, client) => {
    return new Promise ( async (resolve, reject) => {
       
        let existing = await client.HGET(data.symbol, "rules");
        if ( ! existing ) {
            let rules = []
            rules.push(data)
            await client.HSET(data.symbol, {"rules": JSON.stringify(rules)}, (err, success) => {
                reject(err);
                resolve(success)
            });
        } else {
            existing = JSON.parse(existing)
            console.log("existing rule", existing)
            const newData = [...existing, data]
            await client.HSET(data.symbol, {"rules": JSON.stringify(newData)}, (err, success) => {
                reject(err);
                resolve(success)
            }) 
        }
    })
  } 
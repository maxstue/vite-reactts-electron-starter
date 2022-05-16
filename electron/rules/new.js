const quick = require("quick.db")

module.exports =  (data) => {
    return new Promise ( async (resolve, reject) => {
        try {
            const now = Date.now()
            data.created = now
            data.updated = now 
            quick.push("rules", data)
            resolve({
                status: "success",
                module: "rules", 
                content: `New rule has been added for ${data.symbol}`,
                data: data
            })
        } catch (error) {
            reject( {
                status: error,
                module: "rules",
                content: `Could not add a new rule for ${data.symbol}`,
                data: null,
                error: error
            })
        }
    })
} 
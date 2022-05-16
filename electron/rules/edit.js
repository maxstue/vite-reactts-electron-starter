const quick = require("quick.db")

module.exports = (data) => {
    return new Promise ((resolve, reject) => {
       try {
            const rules = quick.get("rules")
            const newRules = rules.map((rule) => {
                if (rule.id === data.id) {
                    data.updated = Date.now()
                    return data
                }
                return rule
            })
            // const otherRules = rules.filter(rule => rule.id !== data.id )
            // const newRules = [...otherRules, data]
            quick.set("rules", newRules)
            resolve({
                status: "success",
                module: "rules", 
                content: "Rule edited for " + data.symbol, 
                data: data
            })
       } catch (error) {
           reject({
            status: "error", 
            module: "rules",
            content: `Rule could not be edited for ${params.symbol}`,
            data: null,
            error: error
        })
       }
    })
}
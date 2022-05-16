const quick = require("quick.db")

module.exports = () => {
    return new Promise (async (resolve, reject) => {
       try {
            const rules = await quick.get("rules")
            resolve(
                {
                    status: "success", 
                    module: "rules",
                    content: "Rule(s) have been loaded",
                    data: rules
                }
            )
        } catch (error) {
            reject(
                {
                    status: "error", 
                    module: "rules", 
                    content: "Rule(s) could not be loaded",
                    data: null,
                    error: e
                }
            )
       }
    })
}
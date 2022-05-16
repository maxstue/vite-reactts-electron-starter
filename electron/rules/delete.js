const quick = require("quick.db")

module.exports = (data) => {
    return new Promise ( async (resolve, reject) => {
        try {
            const rules = quick.get("rules")
            const newRules = rules.filter(rule => rule.id !== data.id )
            quick.set("rules", newRules)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
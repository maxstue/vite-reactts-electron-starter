const quick = require("quick.db")

module.exports = function(data) {
    return new Promise ( (resolve, reject) => {
        try {
            const { symbol, id } = data
            const key = symbol+".levels"
            const levels = quick.get(key)
            const newLevels = levels.filter(item => item.id !== id)
            quick.set(key, newLevels)
            const deletedLevel = levels.filter(item => item.id === id)
            resolve(deletedLevel)
        } catch (error) {
            reject(error)
        }    
    })   
}
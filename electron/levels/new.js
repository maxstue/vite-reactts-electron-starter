const quick = require("quick.db")

module.exports = (data) => {
    return new Promise ( async (resolve, reject) => {
       
        try {
            quick.push(data.symbol+".levels", data)
            resolve({
                status: "success", 
                module: "levels", 
                content: `Custom Level ${data.denomoState} added for ${data.symbol}`,
                data: data
            })
        } catch (error) {
            reject({
                status: "error",
                module: "levels",
                content: `Could not add level ${data.denomoState} for ${data.symbol}`,
                data: null, 
                error: error
            })
        }  
    })
  }
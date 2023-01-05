const mongoose = require("mongoose")
const dbuser = process.env.DATABASE_USER
const dbPassword = process.env.DATABASE_PASSWORD

const conn = async()=>{
    try{
        const dbConnection = await mongoose.connect(`mongodb+srv://${dbuser}:${dbPassword}@cluster0.tf0kyg7.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Conectado no banco de dados!")
        return dbConnection
    } catch(error){
        console.log(error)
    }
}

conn()

module.exports = conn
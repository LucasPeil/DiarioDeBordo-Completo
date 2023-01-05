require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")

const PORT = 5000 || process.env.PORT


app.use(cors({ credentials: true, origin:"*",allowedHeaders:["Authorization","Content-Type"], methods:'GET,PUT,POST, DELETE, PATCH'}))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
// config JSON and form data response

//app.use(cors({credentials:true, origin:"*"}))
/*app.use((req,res,next)=>{
    res.setHeader(" Access-Control-Allow-Credentials", true)
    res.setHeader(" Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
    res.setHeader("Access-Control-Allow-Methods","Content-Type,Authorization")
  
    app.use(cors());
    next();
})*/





//app.use(cors({origin:"*",allowedHeaders:["Authorization","Content-Type"]}))

 

app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//Database connection
require("./config/database.js")
//routes
const router = require("./routes/Router.js")
app.use(router)

app.listen(PORT, ()=>{
    console.log(`APP ESTÁ RODANDO NA PORT ${PORT}`)
})
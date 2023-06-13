const express=require("express")
const cors=require("cors")
const { connection } = require("./config/db")
const { jobRouter } = require("./Routes/job.routes")

const app=express()
require("dotenv").config()
app.use(cors())
app.use(express.json())

app.use("/job",jobRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log('Connected To database')
    } catch (error) {
        console.log(error)
        console.log("cannot connect to database")
    }
    console.log(`server is running at port ${process.env.port}`)
})
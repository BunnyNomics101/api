import express from 'express'
import { Express } from "express";
import chartData from './routes/chart'

const app:Express = express() ; 
const PORT = process.env.NODE_ENV||3000;

app.use(express.json())

app.use('/chart', chartData)

app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)
})

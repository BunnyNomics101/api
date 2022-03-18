import express from 'express'
import cors from 'cors'
import { Express } from "express";
import chartData from './routes/chart'
import orderbookRoutes from './routes/orderbook'
import { Server } from 'socket.io';
import { createServer } from "http";
import SerumMarket from './utils/SerumMarket';
import { PublicKey } from '@solana/web3.js';
import { FILTERED_MARKETS } from './config/markets';
import socketOrderBook from './socketEmitters/socketOrderBook';
import socketMarket from './socketEmitters/socketMarket';

//initializing server and socket
const app: Express = express();
const PORT = process.env.NODE_ENV || 5000;
const server = createServer(app)
export const io = new Server(server)

//cors enabling
app.use(cors())
//json in flight
app.use(express.json())

//socket connection detector
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//socket emitters
socketMarket(io)
socketOrderBook(io);

//routes
app.use('/chart', chartData)
app.use('/orderbook', orderbookRoutes)

//listening
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

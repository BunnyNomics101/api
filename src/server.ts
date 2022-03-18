import express from 'express'
import cors from 'cors'
import { Express } from "express";
import chartData from './routes/chart'
import orderbookRoutes from './routes/orderbook'
import { Server } from 'socket.io';
import { createServer } from "http";
import SerumMarket from './utils/SerumMarket';
import { PublicKey } from '@solana/web3.js';

const app: Express = express();
const PORT = process.env.NODE_ENV || 5000;
const server = createServer(app)
export const io = new Server(server)

app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

function socketMarkets() {
    const solMarket = "9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT"
    const serumMarket = new SerumMarket(new PublicKey(solMarket));
    setInterval(async () => {
        const item = await serumMarket.getLatestPrice()
        io.emit(solMarket, item.price)
    }, 1800000)
}
socketMarkets()

app.use('/chart', chartData)
app.use('/orderbook', orderbookRoutes)

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

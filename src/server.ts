import express from 'express'
import { Express } from "express";
import chartData from './routes/chart'
import { Server } from 'socket.io';
import { createServer } from "http";

const app: Express = express();
const PORT = process.env.NODE_ENV || 3000;
const server = createServer(app)
export const io = new Server(server)

app.use(express.json())

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('hello',{message: "hello users"})
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use('/chart', chartData)

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

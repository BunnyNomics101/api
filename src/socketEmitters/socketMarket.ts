import { PublicKey } from "@solana/web3.js";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import SerumMarket from "../utils/SerumMarket";

export default function socketMarket(
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
    const solMarket = "9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT"
    const serumMarket = new SerumMarket(new PublicKey(solMarket));
    setInterval(async () => {
        const item = await serumMarket.getLatestPrice()
        io.emit(solMarket, item.price)
    }, 1800000) 
}
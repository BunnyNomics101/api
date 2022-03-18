import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { FILTERED_MARKETS } from "../config/markets";
import SerumMarket from "../utils/SerumMarket";

export default function socketOrderBook(
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
    FILTERED_MARKETS.forEach(({ address }) => {
        const serumMarket = new SerumMarket(address);
        serumMarket.loadAll()
        .then(()=>{
            console.log(`loaded: ${address.toBase58()}`)
        })
        .then(() => {
            let asks, bids;
            setInterval(() => {
                try{
                    asks = serumMarket.getLNasks(20);
                    bids = serumMarket.getLNbids(20);
                    io.emit(`orderbook-${address.toBase58()}`, { bids, asks })
                }catch(error){
                    console.log(error)
                }
            }, 150)
        })
    })
}
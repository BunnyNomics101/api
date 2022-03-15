



// getMarket();
import { PublicKey } from "@solana/web3.js";
import SerumMarket from "./utils/SerumMarket";
import axios from 'axios'
//example token
const solscanUrl = "https://api.solscan.io/amm/tvl?address=AvVJcsk26dYHXS9Uya2tkDdSD3i59ubvo1qYKB2w2j5C&type=30m&time_from=1647255089.415&time_to=1647341489.415"

// axios.get(solscanUrl).then(result=>{
//     console.log(JSON.stringify(result.data))
// })

const serumMarket = new SerumMarket(
    new PublicKey('AvVJcsk26dYHXS9Uya2tkDdSD3i59ubvo1qYKB2w2j5C'),
    new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin')
)

async function work() {
    // await serumMarket.loadAll();
    // console.log(serumMarket.getL2bids())

    serumMarket.getPriceChart("DAY").then(res=>{
        console.log(res)
    })
}
work () ;
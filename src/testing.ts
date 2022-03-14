// import SerumAdapter from "./utils/serumAdapter";
// import { PublicKey } from "@solana/web3.js";

// const serumAdapter = new SerumAdapter(
//     new PublicKey('9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT'),
//     new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin')
// )

// async function getMarket(){
//     const market = await serumAdapter.loadMarket();
//     console.log(market)
// }

// getMarket();
import { Account, Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';

let connection = new Connection('https://api.mainnet-beta.solana.com');
let marketAddress = new PublicKey('6oGsL2puUgySccKzn9XA9afqF217LfxP5ocq4B3LWsjy');
let programAddress = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin");

(async () => {
    let market = await Market.load(connection, marketAddress, {}, programAddress);

    // Fetching orderbooks
    let bids = await market.loadBids(connection);
    // let asks = await market.loadAsks(connection);

    // L2 orderbook data
    for (let [price, size] of bids.getL2(20)) {
        console.log(price, size);
    }
})()

import { Account, Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';
import { Orderbook } from '@project-serum/serum/lib/market';


const connection = new Connection('https://api.mainnet-beta.solana.com');

class SerumAdapter {

    private market: Market
    private bids: Orderbook
    private asks: Orderbook

    constructor(
        private marketAddress: PublicKey = new PublicKey(''),
        private programAddress: PublicKey = new PublicKey(''),
    ) {
    }

    //loaders
    async loadAll(){
        await this.loadMarket();
        await this.loadMarketData();
    }

    async loadMarketWithData() {
        await this.loadMarket()
        await this.loadMarketData()
    }
    
    async loadMarket() {
        const market = await Market.load(
            connection,
            this.marketAddress,
            {},
            this.programAddress
        );
        this.market = market;
        return market;
    }

    async loadMarketData() {
        this.bids = await this.market.loadBids(connection);
        this.asks = await this.market.loadAsks(connection);
    }

    //Getters
    public getMarket() {
        return this.market;
    }

    public getL2bids() {
        const arrayOfBids : {price: number, size: number}[]= [] ; 
        for (let [price, size] of this.bids.getL2(20)) {
            arrayOfBids.push({price, size})
        }
        return arrayOfBids; 
    }

    public getFullOrderBookData(){
        const arrayOfOrders : {
            orderId: any, 
            price : number, 
            size: number, 
            side:"buy"|"sell"
        }[]= []
        for (let order of this.asks) {
            arrayOfOrders.push({
                orderId: order.orderId,
                price: order.price,
                size: order.size,
                side: order.side, // 'buy' or 'sell'
            });
        }
        return arrayOfOrders
    }

}

export default SerumAdapter
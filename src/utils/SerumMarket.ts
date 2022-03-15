import { Account, Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';
import { Orderbook } from '@project-serum/serum/lib/market';
import { SERUM_NET_URL, SERUM_DEX_PROGRAM, SOLSCAN_API_URL } from '../config';
import axios from 'axios';

const connection = new Connection(SERUM_NET_URL);

class SerumMarket {

    private market?: Market
    private bids?: Orderbook
    private asks?: Orderbook

    constructor(
        private marketAddress: PublicKey,
        private programAddress: PublicKey = new PublicKey(SERUM_DEX_PROGRAM),
    ) {
    }

    //loaders
    async loadAll() {
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
        if(!this.market) throw Error('market not loaded') ;
        this.bids = await this.market.loadBids(connection);
        this.asks = await this.market.loadAsks(connection);
    }

    //Getters
    public getMarket() {
        return this.market;
    }

    public getL2bids() {
        if(!this.bids) throw Error('bids not loaded')
        const arrayOfBids: { price: number, size: number }[] = [];
        for (let [price, size] of this.bids.getL2(20)) {
            arrayOfBids.push({ price, size })
        }
        return arrayOfBids;
    }

    public getFullOrderBookData() {
        if(!this.asks) throw Error('asks not loaded')
        const arrayOfOrders: {
            orderId: any,
            price: number,
            size: number,
            side: "buy" | "sell"
        }[] = []
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


    //price TVL part
    public async getPriceChart(from: string, step = 30) {
        const toUnix = (date: Date) => date.getTime() / 1000;
        const getFrom = (daysMinus: number) => {
            const now = new Date();
            now.setDate(now.getDate() - daysMinus);
            return now;
        }

        let fromDate;
        switch (from) {
            case "DAY":
                fromDate = getFrom(1);
                break;
            case "WEEK":
                fromDate = getFrom(7);
                break;
            case "MONTH":
                fromDate = getFrom(30);
                break;
            case "3MONTH":
                fromDate = getFrom(90);
                break;
            case "YEAR":
                fromDate = getFrom(316);
                break;
            default:
                throw Error('please specify the date range')
        }

        const address = this.marketAddress.toBase58()
        const urlString = `${SOLSCAN_API_URL}?address=${address}&type=${step}m&time_from=${toUnix(fromDate)}&time_to=${toUnix(new Date())}`
        
        const items =await axios.get(urlString).then(response => response.data.data.items)
        return items;
    }

}

export default SerumMarket
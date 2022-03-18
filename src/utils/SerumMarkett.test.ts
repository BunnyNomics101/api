import SerumMarket from './SerumMarket'
import { PublicKey } from "@solana/web3.js";



describe('serumMarket', ()=>{
    let serumMarket: SerumMarket ; 

    beforeEach(()=>{
        //sol usdc
        serumMarket = new SerumMarket(
            new PublicKey('A8YFbxQYFVqKZaoYJLLUVcQiWP7G2MeEgW5wsAQgMvFw'), 
        )
    })

    test('checks that the object is created',()=>{
        expect(serumMarket).not.toBeUndefined;
    })

    test('market loads',async()=>{
        const market = await serumMarket.loadMarket();
        expect(market).not.toBeUndefined();
    },10000) 

    test('market bids load',async()=>{

        await serumMarket.loadAll();
        expect(
            serumMarket
                .getLNbids(20)
                .length
        ).toEqual(20) 
    },10000) 

    test('market asks load',async()=>{ 
        await serumMarket.loadAll();
        expect(
            serumMarket
                .getLNasks(20)
                .length
        ).toEqual(20)
    },10000)

    test('market orders load',async()=>{
        await serumMarket.loadAll();
        expect(
            serumMarket
                .getFullOrderBookData()   
                .length
        ).toBeGreaterThan(0)
    },10000)

    test('get price char', async ()=>{
        await serumMarket.loadAll();
        const priceTable = await serumMarket.getPriceAMM("DAY")
        expect(priceTable.length).toBeGreaterThan(0)
    })
})

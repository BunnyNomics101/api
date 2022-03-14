import SerumAdapter from './serumAdapter'
import { PublicKey } from "@solana/web3.js";



describe('serumAdapter', ()=>{
    let serumAdapter: SerumAdapter ; 

    beforeEach(()=>{
        //sol usdc
        serumAdapter = new SerumAdapter(
            new PublicKey('9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT'),
            new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin')
        )
    })

    test('checks that the object is created',()=>{
        expect(serumAdapter).not.toBeUndefined;
    })

    test('market loads',async()=>{
        const market = await serumAdapter.loadMarket();
        expect(market).not.toBeUndefined();
    },30000)

    
})

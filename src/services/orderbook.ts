import SerumMarket from "../utils/SerumMarket";
import { Request, Response } from "express";
import { PublicKey } from "@solana/web3.js";

export async function getAsks(req: Request, res:Response){
    const marketAddress:string = req.params.address ; 
    const nbr: number = parseInt(req.params.nbr) ; 

    const serumMarket = new SerumMarket(
        new PublicKey(marketAddress)
    )

    try{
        await serumMarket.loadAll(); 
        const data = serumMarket.getLNasks(nbr)
        res.status(200).send(data)
    }catch{
        res.status(404).send('bad market')
    }
}

export async function getBids(req: Request, res:Response){
    const marketAddress:string = req.params.address ; 
    const nbr: number = parseInt(req.params.nbr) ; 

    const serumMarket = new SerumMarket(
        new PublicKey(marketAddress)
    )

    try{
        await serumMarket.loadAll(); 
        const data = serumMarket.getLNbids(nbr)
        res.status(200).send(data)
    }catch{
        res.status(404).send('bad market')
    }
}

export async function getBoth(req:Request, res: Response){
    const marketAddress: string= req.params.address;
    const nbr: number = parseInt(req.params.nbr)

    const serumMarket= new SerumMarket(
        new PublicKey(marketAddress)
    )
    try {
        await serumMarket.loadMarket();
        await serumMarket.loadAsksAndBids();

        const bids = serumMarket.getLNbids(nbr)
        const asks = serumMarket.getLNasks(nbr);
        res.status(200).send({bids,asks})
    }catch{
        res.status(404).send('bad market');
    }
}
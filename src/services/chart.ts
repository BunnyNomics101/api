import { PublicKey } from "@solana/web3.js";
import { Request, Response } from "express"
import SerumMarket from "../utils/SerumMarket"

export const getChartData = async(req:Request, res:Response)=>{

    const marketAddress = req.params.id; 
    const timestamp = req.params.timestamp; 
    const serumMarket = new SerumMarket(
        new PublicKey(marketAddress)
    )

    try{
        await serumMarket.loadAll();
        const data= await serumMarket.getPriceAMM(timestamp)
        res.status(200).send(data)
    }catch{
        res.status(404).send('bad timestamp or market address')
    }
}
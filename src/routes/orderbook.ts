import { Router } from 'express'
const router = Router() ; 

router.get('/asks/:address', (req, res)=>{
    res.status(200).send("asks")
})

router.get('/bids/:address', (req, res)=>{
    res.status(200).send("bids")
})

export default router ; 
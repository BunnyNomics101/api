import { application, Router, Request, Response } from "express";

const router = Router();

router.get('/' , (req:Request, res: Response)=>{
    res.status(200).send({
        message: 'youre getting to the chart data'
    })
})

export default router ; 
import { application, Router, Request, Response } from "express";
import { getChartData } from "../services/chart";

const router = Router();

router.get('/:id/:timestamp' , getChartData)

export default router ; 
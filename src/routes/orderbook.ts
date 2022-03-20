import { Router } from 'express'
import { getAsks, getBids } from '../services/orderbook';
const router = Router() ; 

router.get('/asks/:address/:nbr', getAsks)

router.get('/bids/:address/:nbr', getBids) 

router.get('/:address/:nbr')


export default router ; 
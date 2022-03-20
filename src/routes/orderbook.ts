import { Router } from 'express'
import { getAsks, getBids } from '../services/orderbook';
import { getBoth } from '../services/orderbook';

const router = Router() ; 

router.get('/asks/:address/:nbr', getAsks)

router.get('/bids/:address/:nbr', getBids) 

router.get('/:address/:nbr', getBoth)


export default router ; 
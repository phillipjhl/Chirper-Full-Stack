//Main router for whole app

//Module imports
//Route imports
import { Router } from 'express';
import chirpRouter from './chirps';

let router = Router();

router.use('/chirps', chirpRouter);

export default router;
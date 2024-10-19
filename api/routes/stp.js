import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Import your STP controller here
import * as stpController from '../../controllers/stpController.js';

// Define your routes
router.post('/registra-orden', stpController.registraOrden);

export default router;

import express from 'express';
import { body, param, query } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import {
  createSwap,
  getSwap,
  getSwaps,
  updateSwapStatus,
  cancelSwap,
} from '../controllers/swap';

const router = express.Router();

// Create a new swap
router.post(
  '/',
  [
    body('fromTokenId').isString().notEmpty(),
    body('toTokenId').isString().notEmpty(),
    body('fromAmount').isFloat({ min: 0 }),
    body('toAmount').isFloat({ min: 0 }),
    body('fromAddress').isString().notEmpty(),
    body('toAddress').isString().notEmpty(),
  ],
  validateRequest,
  createSwap
);

// Get a specific swap
router.get(
  '/:id',
  [param('id').isMongoId()],
  validateRequest,
  getSwap
);

// Get all swaps with optional filters
router.get(
  '/',
  [
    query('status').optional().isIn(['pending', 'completed', 'failed', 'cancelled']),
    query('fromAddress').optional().isString(),
    query('toAddress').optional().isString(),
  ],
  validateRequest,
  getSwaps
);

// Update swap status
router.patch(
  '/:id/status',
  [
    param('id').isMongoId(),
    body('status').isIn(['completed', 'failed']),
    body('transactionHash').optional().isString(),
  ],
  validateRequest,
  updateSwapStatus
);

// Cancel a swap
router.post(
  '/:id/cancel',
  [param('id').isMongoId()],
  validateRequest,
  cancelSwap
);

export default router; 
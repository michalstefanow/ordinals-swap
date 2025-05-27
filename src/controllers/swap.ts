import { Request, Response, NextFunction } from 'express';
import { Swap, ISwap } from '../models/swap';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

export const createSwap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      fromTokenId,
      toTokenId,
      fromAmount,
      toAmount,
      fromAddress,
      toAddress,
    } = req.body;

    const swap = await Swap.create({
      fromTokenId,
      toTokenId,
      fromAmount,
      toAmount,
      fromAddress,
      toAddress,
    });

    logger.info(`Created new swap: ${swap._id}`);
    res.status(201).json({
      status: 'success',
      data: swap,
    });
  } catch (error) {
    next(error);
  }
};

export const getSwap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (!swap) {
      throw new AppError(404, 'Swap not found');
    }

    res.status(200).json({
      status: 'success',
      data: swap,
    });
  } catch (error) {
    next(error);
  }
};

export const getSwaps = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, fromAddress, toAddress } = req.query;
    const query: any = {};

    if (status) query.status = status;
    if (fromAddress) query.fromAddress = fromAddress;
    if (toAddress) query.toAddress = toAddress;

    const swaps = await Swap.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({
      status: 'success',
      results: swaps.length,
      data: swaps,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSwapStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, transactionHash } = req.body;
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      throw new AppError(404, 'Swap not found');
    }

    if (swap.status !== 'pending') {
      throw new AppError(400, 'Can only update pending swaps');
    }

    swap.status = status;
    if (transactionHash) swap.transactionHash = transactionHash;

    await swap.save();

    logger.info(`Updated swap ${swap._id} status to ${status}`);
    res.status(200).json({
      status: 'success',
      data: swap,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSwap = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const swap = await Swap.findById(req.params.id);

    if (!swap) {
      throw new AppError(404, 'Swap not found');
    }

    if (swap.status !== 'pending') {
      throw new AppError(400, 'Can only cancel pending swaps');
    }

    swap.status = 'cancelled';
    await swap.save();

    logger.info(`Cancelled swap: ${swap._id}`);
    res.status(200).json({
      status: 'success',
      data: swap,
    });
  } catch (error) {
    next(error);
  }
}; 
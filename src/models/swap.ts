import mongoose, { Document, Schema } from 'mongoose';

export interface ISwap extends Document {
  fromTokenId: string;
  toTokenId: string;
  fromAmount: number;
  toAmount: number;
  fromAddress: string;
  toAddress: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  transactionHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const swapSchema = new Schema<ISwap>(
  {
    fromTokenId: {
      type: String,
      required: true,
      index: true,
    },
    toTokenId: {
      type: String,
      required: true,
      index: true,
    },
    fromAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    toAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    fromAddress: {
      type: String,
      required: true,
      index: true,
    },
    toAddress: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    transactionHash: {
      type: String,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
swapSchema.index({ createdAt: -1 });
swapSchema.index({ fromAddress: 1, status: 1 });
swapSchema.index({ toAddress: 1, status: 1 });

export const Swap = mongoose.model<ISwap>('Swap', swapSchema); 
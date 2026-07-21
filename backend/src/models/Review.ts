import { Schema, model, Types } from 'mongoose'

interface IReview {
  chapter: Types.ObjectId
  comic: Types.ObjectId
  editor: Types.ObjectId
  author: Types.ObjectId
  status: 'approved' | 'rejected'
  comments: string
  createdAt: Date
  updatedAt: Date
}

const reviewSchema = new Schema<IReview>(
  {
    chapter: {
      type: Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    comic: {
      type: Schema.Types.ObjectId,
      ref: 'Comic',
      required: true,
    },
    editor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['approved', 'rejected'],
      required: true,
    },
    comments: String,
  },
  { timestamps: true }
)

export const Review = model<IReview>('Review', reviewSchema)

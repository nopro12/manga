import { Schema, model, Types } from 'mongoose'

interface IReadingHistory {
  user: Types.ObjectId
  comic: Types.ObjectId
  chapter: Types.ObjectId
  lastReadAt: Date
  progress: number
}

const readingHistorySchema = new Schema<IReadingHistory>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comic: {
      type: Schema.Types.ObjectId,
      ref: 'Comic',
      required: true,
    },
    chapter: {
      type: Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    lastReadAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export const ReadingHistory = model<IReadingHistory>('ReadingHistory', readingHistorySchema)

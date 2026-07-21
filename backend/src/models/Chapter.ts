import { Schema, model, Types } from 'mongoose'

interface IChapter {
  title: string
  chapterNumber: number
  comic: Types.ObjectId
  author: Types.ObjectId
  images: string[]
  content: string
  status: 'draft' | 'pending' | 'approved' | 'published'
  views: number
  createdAt: Date
  updatedAt: Date
}

const chapterSchema = new Schema<IChapter>(
  {
    title: {
      type: String,
      required: true,
    },
    chapterNumber: {
      type: Number,
      required: true,
    },
    comic: {
      type: Schema.Types.ObjectId,
      ref: 'Comic',
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'pending', 'approved', 'published'],
      default: 'draft',
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export const Chapter = model<IChapter>('Chapter', chapterSchema)

import { Schema, model, Types } from 'mongoose'

export enum ComicStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PUBLISHED = 'published',
}

interface IComic {
  title: string
  description: string
  author: Types.ObjectId
  coverImage: string
  genre: string[]
  status: ComicStatus
  chapters: Types.ObjectId[]
  views: number
  rating: number
  createdAt: Date
  updatedAt: Date
}

const comicSchema = new Schema<IComic>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(ComicStatus),
      default: ComicStatus.DRAFT,
    },
    chapters: {
      type: [Schema.Types.ObjectId],
      ref: 'Chapter',
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
)

export const Comic = model<IComic>('Comic', comicSchema)

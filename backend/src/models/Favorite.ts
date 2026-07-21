import { Schema, model, Types } from 'mongoose'

interface IFavorite {
  user: Types.ObjectId
  comic: Types.ObjectId
  createdAt: Date
}

const favoriteSchema = new Schema<IFavorite>(
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
  },
  { timestamps: true }
)

// Create unique index to prevent duplicate favorites
favoriteSchema.index({ user: 1, comic: 1 }, { unique: true })

export const Favorite = model<IFavorite>('Favorite', favoriteSchema)

import { Schema, model } from 'mongoose'

export enum UserRole {
  READER = 'reader',
  AUTHOR = 'author',
  EDITOR = 'editor',
  ADMIN = 'admin',
}

interface IUser {
  username: string
  email: string
  password: string
  role: UserRole
  avatar?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.READER,
    },
    avatar: String,
    bio: String,
  },
  { timestamps: true }
)

export const User = model<IUser>('User', userSchema)

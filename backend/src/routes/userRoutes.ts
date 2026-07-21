import { Router, Request, Response } from 'express'
import { User, UserRole } from '../models/User'
import { authenticate, authorize } from '../middleware/auth'

const router = Router()

// Get current user
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Get all users (Admin only)
router.get(
  '/',
  authenticate,
  authorize([UserRole.ADMIN]),
  async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 20
      const skip = (page - 1) * limit

      const users = await User.find()
        .select('-password')
        .limit(limit)
        .skip(skip)

      const total = await User.countDocuments()

      res.json({
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Update user role (Admin only)
router.patch(
  '/:id/role',
  authenticate,
  authorize([UserRole.ADMIN]),
  async (req: Request, res: Response) => {
    try {
      const { role } = req.body

      if (!Object.values(UserRole).includes(role)) {
        return res.status(400).json({ message: 'Invalid role' })
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      ).select('-password')

      res.json({ message: 'User role updated', user })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Delete user (Admin only)
router.delete(
  '/:id',
  authenticate,
  authorize([UserRole.ADMIN]),
  async (req: Request, res: Response) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.json({ message: 'User deleted' })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

export default router

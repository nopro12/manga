import { Router, Request, Response } from 'express'
import { Comic, ComicStatus } from '../models/Comic'
import { Chapter } from '../models/Chapter'
import { Review } from '../models/Review'
import { Favorite } from '../models/Favorite'
import { authenticate, authorize } from '../middleware/auth'
import { UserRole } from '../models/User'

const router = Router()

// Get all published comics
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 12
    const skip = (page - 1) * limit

    const comics = await Comic.find({ status: ComicStatus.PUBLISHED })
      .populate('author', 'username avatar')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })

    const total = await Comic.countDocuments({ status: ComicStatus.PUBLISHED })

    res.json({
      comics,
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
})

// Get trending comics
router.get('/trending', async (req: Request, res: Response) => {
  try {
    const comics = await Comic.find({ status: ComicStatus.PUBLISHED })
      .populate('author', 'username avatar')
      .sort({ views: -1 })
      .limit(5)

    res.json(comics)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Get comic by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const comic = await Comic.findById(req.params.id)
      .populate('author', 'username avatar bio')
      .populate({
        path: 'chapters',
        populate: { path: 'author', select: 'username' },
      })

    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' })
    }

    // Increment views
    comic.views += 1
    await comic.save()

    res.json(comic)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

// Create comic (Author only)
router.post(
  '/',
  authenticate,
  authorize([UserRole.AUTHOR, UserRole.ADMIN]),
  async (req: Request, res: Response) => {
    try {
      const { title, description, coverImage, genre } = req.body

      const comic = new Comic({
        title,
        description,
        coverImage,
        genre,
        author: req.userId,
        status: ComicStatus.DRAFT,
      })

      await comic.save()
      await comic.populate('author', 'username')

      res.status(201).json({ message: 'Comic created', comic })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Submit comic for review (Author only)
router.patch(
  '/:id/submit',
  authenticate,
  authorize([UserRole.AUTHOR, UserRole.ADMIN]),
  async (req: Request, res: Response) => {
    try {
      const comic = await Comic.findById(req.params.id)

      if (!comic) {
        return res.status(404).json({ message: 'Comic not found' })
      }

      if (comic.author.toString() !== req.userId) {
        return res.status(403).json({ message: 'Not authorized' })
      }

      comic.status = ComicStatus.PENDING
      await comic.save()

      res.json({ message: 'Comic submitted for review', comic })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Approve comic (Editor only)
router.patch(
  '/:id/approve',
  authenticate,
  authorize([UserRole.EDITOR, UserRole.ADMIN]),
  async (req: Request, res: Response) => {
    try {
      const comic = await Comic.findById(req.params.id)

      if (!comic) {
        return res.status(404).json({ message: 'Comic not found' })
      }

      comic.status = ComicStatus.PUBLISHED
      await comic.save()

      res.json({ message: 'Comic approved', comic })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

// Reject comic (Editor only)
router.patch(
  '/:id/reject',
  authenticate,
  authorize([UserRole.EDITOR, UserRole.ADMIN]),
  async (req: Request, res: Response) => {
    try {
      const { reason } = req.body
      const comic = await Comic.findById(req.params.id)

      if (!comic) {
        return res.status(404).json({ message: 'Comic not found' })
      }

      comic.status = ComicStatus.REJECTED
      await comic.save()

      res.json({ message: 'Comic rejected', reason, comic })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
)

export default router

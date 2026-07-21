# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                 │
│  ├─ Pages (Authentication, Comics, Dashboard, Admin)   │
│  ├─ Components (Header, Footer, ComicCard, etc.)       │
│  └─ Styles (Tailwind CSS)                              │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/HTTPS
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend (Express.js)                  │
│  ├─ Routes (Auth, Comics, Users, Chapters, Reviews)    │
│  ├─ Models (User, Comic, Chapter, Review, etc.)        │
│  ├─ Middleware (Authentication, Authorization)         │
│  └─ Controllers (Business Logic)                       │
└────────────────────┬────────────────────────────────────┘
                     │ MongoDB Driver
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Database (MongoDB)                     │
│  ├─ Collections: Users, Comics, Chapters, Reviews      │
│  ├─ Indexes for performance optimization               │
│  └─ Relationships via ObjectId references              │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: Zustand (or localStorage for simple cases)
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Deployment**: Railway/Render

### DevOps
- **Version Control**: Git/GitHub
- **CI/CD**: GitHub Actions (optional)
- **Monitoring**: Sentry (optional)
- **Image Hosting**: Cloudinary or AWS S3 (optional)

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: Enum ["reader", "author", "editor", "admin"],
  avatar: String,
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Comics Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  author: ObjectId (ref: User),
  coverImage: String,
  genre: [String],
  status: Enum ["draft", "pending", "approved", "rejected", "published"],
  chapters: [ObjectId] (ref: Chapter),
  views: Number,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Chapters Collection
```javascript
{
  _id: ObjectId,
  title: String,
  chapterNumber: Number,
  comic: ObjectId (ref: Comic),
  author: ObjectId (ref: User),
  images: [String],
  content: String,
  status: Enum ["draft", "pending", "approved", "published"],
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Reviews Collection
```javascript
{
  _id: ObjectId,
  chapter: ObjectId (ref: Chapter),
  comic: ObjectId (ref: Comic),
  editor: ObjectId (ref: User),
  author: ObjectId (ref: User),
  status: Enum ["approved", "rejected"],
  comments: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Flow

```
1. User Registration
   POST /auth/register → Hash password → Create user → Return JWT token

2. User Login
   POST /auth/login → Verify password → Generate JWT token → Return token

3. Create Comic
   POST /comics (with auth) → Verify author role → Create comic record → Return comic

4. Submit Comic for Review
   PATCH /comics/:id/submit → Verify author → Change status to "pending" → Notify editors

5. Approve Comic
   PATCH /comics/:id/approve → Verify editor role → Change status to "published"

6. Read Comic
   GET /comics/:id → Increment views → Return comic with chapters
```

## User Roles & Permissions

### Reader
- Read published comics
- View chapters
- Add to favorites
- Track reading history

### Author
- Create comic series
- Upload chapters
- Submit for review
- View own comics and stats
- Cannot approve/reject

### Editor
- Review pending comics
- Approve/reject submissions
- Leave feedback comments
- View all comics

### Admin
- All permissions
- Manage users (create, update, delete, assign roles)
- View system statistics
- Configure settings

## Security Considerations

1. **Authentication**: JWT tokens with 7-day expiration
2. **Password**: Bcrypt hashing with salt rounds = 10
3. **CORS**: Restricted to frontend domain in production
4. **Input Validation**: Using express-validator
5. **Error Handling**: Generic error messages to prevent information leakage
6. **MongoDB**: Use connection string with credentials
7. **Rate Limiting**: To be implemented
8. **HTTPS**: Enforced in production

## Performance Optimizations

1. **Database Indexing**: Indexes on frequently queried fields
2. **Pagination**: Limit and offset for large result sets
3. **Image Optimization**: Lazy loading and CDN delivery
4. **Caching**: Implement Redis for session/data caching
5. **Compression**: gzip compression for responses
6. **Code Splitting**: Next.js automatic code splitting

## Scalability Plan

### Phase 1 (Current)
- Single MongoDB instance
- Stateless backend servers
- Basic caching

### Phase 2
- Database replication
- Redis caching layer
- Image CDN integration
- Load balancing

### Phase 3
- Database sharding
- Microservices architecture
- Message queues (RabbitMQ/Kafka)
- Advanced monitoring

## Future Enhancements

- [ ] Real-time notifications (WebSocket)
- [ ] Comment system on chapters
- [ ] User ratings and reviews
- [ ] Social features (follow creators, share)
- [ ] Mobile app (React Native)
- [ ] Advanced search and filters
- [ ] Analytics dashboard
- [ ] Recommendation engine
- [ ] Payment integration for premium content
- [ ] Creator monetization

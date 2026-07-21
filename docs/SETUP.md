# Setup & Deployment Guide

## Local Development Setup

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/nopro12/manga.git
cd manga
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

### Step 3: Configure Environment Variables

**Frontend (.env.local)**
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your API URL
```

**Backend (.env)**
```bash
cd ../backend
cp .env.example .env
# Edit .env with MongoDB URI and JWT secret
```

### Step 4: Start Development Servers

```bash
# From root directory, run both frontend and backend
npm run dev

# Or run separately:
# Terminal 1 - Frontend
cd frontend && npm run dev

# Terminal 2 - Backend
cd backend && npm run dev
```

Access the app:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## Deployment to Vercel

### Frontend Deployment

1. **Push to GitHub**
   ```bash
   git push origin develop
   ```

2. **Deploy to Vercel**
   - Visit https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select "manga" repository
   - Configure project:
     - **Framework Preset**: Next.js
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`

3. **Environment Variables**
   - Add in Vercel project settings:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.com
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

### Backend Deployment (Railway or Render)

#### Option A: Railway

1. Visit https://railway.app
2. Create new project
3. Connect GitHub repository
4. Select "manga" repo
5. Add MongoDB plugin
6. Configure environment variables:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/manga
   JWT_SECRET=your-secret-key
   PORT=5000
   NODE_ENV=production
   ```
7. Deploy

#### Option B: Render

1. Visit https://render.com
2. Create new "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
5. Add environment variables
6. Deploy

---

## Database Setup

### MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/manga
   ```
4. Add to `.env` files

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string:
   ```
   mongodb://localhost:27017/manga
   ```

---

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## Production Checklist

- [ ] Set secure JWT_SECRET
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set up monitoring (Sentry, etc.)
- [ ] Configure email service
- [ ] Set up image upload service (AWS S3, Cloudinary)
- [ ] Enable HTTPS
- [ ] Set up CI/CD pipeline
- [ ] Configure database backups
- [ ] Set up error logging
- [ ] Configure security headers

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
- Check MongoDB is running
- Verify connection string
- Check network access (for Atlas)
- Verify username/password

### CORS Errors
- Check backend CORS configuration
- Verify API URL in frontend .env
- Check browser console for specific errors

### Build Errors
- Clear node_modules and reinstall
- Check Node.js version (need v18+)
- Check for TypeScript errors

---

## Useful Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

---

For more help, check the main README.md or open an issue on GitHub.

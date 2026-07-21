# Manga Comic Publishing Platform

> A modern web platform for publishing, reading, and discovering manga & comics

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnopro12%2Fmanga&project-name=manga-app&repository-name=manga)

## 🌟 Features

✅ **User Authentication** - Register, login with JWT  
✅ **Comic Publishing** - Authors can create and publish series  
✅ **Editorial System** - Editors review and approve content  
✅ **Reader Experience** - Browse, search, read comics  
✅ **User Dashboard** - Track reading history, favorites  
✅ **Admin Panel** - Manage users and content  
✅ **Mobile Responsive** - Works on all devices  
✅ **Modern UI** - Built with Tailwind CSS  

## 🚀 Quick Start (Deploy in 5 minutes)

### Frontend Deploy (Vercel)

1. Click the button above or visit: https://vercel.com/new
2. Select your GitHub repository
3. Vercel detects Next.js automatically
4. Click "Deploy"
5. Done! ✅

### Backend Deploy (Railway)

1. Visit: https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select `nopro12/manga` repository
4. Add Environment Variables:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   NODE_ENV=production
   ```
5. Click Deploy
6. Copy Backend URL and add to Vercel:
   ```
   NEXT_PUBLIC_API_URL=<your-railway-url>
   ```

**Full deployment guide:** See [DEPLOY.md](./DEPLOY.md)

## 📚 Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Auth**: JWT
- **Deployment**: Railway/Render

## 📁 Project Structure

```
manga/
├── frontend/          # Next.js app
│   ├── app/          # Pages & routes
│   ├── components/   # React components
│   └── public/       # Static files
├── backend/          # Express API
│   └── src/
│       ├── routes/   # API endpoints
│       ├── models/   # MongoDB schemas
│       └── middleware/
├── docs/            # Documentation
└── DEPLOY.md        # Deployment guide
```

## 📖 Documentation

- **[DEPLOY.md](./DEPLOY.md)** - Quick deployment guide
- **[docs/SETUP.md](./docs/SETUP.md)** - Local development setup
- **[docs/API.md](./docs/API.md)** - API documentation
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture
- **[docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)** - Contributing guidelines
- **[docs/ROADMAP.md](./docs/ROADMAP.md)** - Development roadmap

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **Reader** | Browse, read, favorite comics |
| **Author** | Create series, upload chapters, submit for review |
| **Editor** | Review submissions, approve/reject content |
| **Admin** | Full access, manage users, view analytics |

## 🔐 Security

- JWT token authentication
- Bcrypt password hashing
- CORS protection
- Input validation
- Environment variables for secrets

## 🚀 Deployment Checklist

- [ ] Create MongoDB Atlas account
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway
- [ ] Add environment variables
- [ ] Connect frontend & backend URLs
- [ ] Test user registration
- [ ] Test comic creation & reading
- [ ] Test admin features

## 💬 Support

Have questions? Check [DEPLOY.md](./DEPLOY.md) for troubleshooting or open an issue on GitHub.

## 📄 License

MIT License - feel free to use for your projects!

---

**Ready to deploy?** Follow [DEPLOY.md](./DEPLOY.md) for step-by-step instructions.

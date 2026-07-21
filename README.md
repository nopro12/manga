# Comic Publishing Management Web App

A modern platform for publishing, discovering, and reading manga/comics online.

## Features

### 👥 User Roles
- **Readers**: Browse, read, and manage favorite comics
- **Authors**: Create series, upload chapters, submit for review
- **Editors**: Review and publish content
- **Admins**: Manage users and system permissions

## Tech Stack

- **Frontend**: Next.js + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Deployment**: Vercel

## Project Structure

```
.
├── frontend/           # Next.js application
├── backend/            # Express API server
└── docs/               # Documentation
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB

### Installation

```bash
# Clone repository
git clone https://github.com/nopro12/manga.git
cd manga

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## Development Plan

### Sprint 1: Authentication
- User registration
- User login
- Password encryption

### Sprint 2: Reader Features
- Browse comics
- View comic details

### Sprint 3: Reading
- Read chapters
- Save reading history

### Sprint 4: Favorites
- Bookmark comics

### Sprint 5: Author Tools
- Create series
- Upload chapters
- Submit for review

### Sprint 6: Editorial
- Review submissions
- Approve/Reject

### Sprint 7: Publishing
- Schedule publication
- Send notifications

### Sprint 8: Admin
- User management
- Role assignment

## License

MIT

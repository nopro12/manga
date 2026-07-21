# Contributing Guide

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make** your changes
5. **Commit** with clear messages
   ```bash
   git commit -m "feat: Add new feature"
   ```
6. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create** a Pull Request

## Commit Message Format

We follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build, dependencies, or tooling

### Examples
```
feat(auth): add two-factor authentication
fix(comics): correct image loading issue
docs: update API documentation
refactor(backend): simplify user service
```

## Code Standards

### Frontend
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Proper component naming (PascalCase)
- Props interface definitions
- CSS classes with Tailwind utilities

### Backend
- Use TypeScript strictly
- Follow Express conventions
- Proper error handling
- Clear function names (camelCase)
- Input validation on all routes
- Meaningful error messages

## Testing

Before submitting a PR:

```bash
# Frontend
cd frontend
npm test
npm run lint

# Backend
cd backend
npm test
npm run lint
```

## Pull Request Process

1. **Update** README.md if applicable
2. **Add** tests for new features
3. **Ensure** all tests pass
4. **Follow** the PR template
5. **Request** review from maintainers

## PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change

## Testing Done
Describe testing approach

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

## Issues

### Reporting Bugs

Include:
- Clear title
- Detailed description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if relevant
- Environment info

### Feature Requests

Include:
- Use case description
- Proposed solution
- Alternative approaches
- Additional context

## Development Workflow

```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature

# Make changes and test
npm run dev
npm run test
npm run lint

# Commit and push
git add .
git commit -m "feat: your feature"
git push origin feature/your-feature

# Create PR on GitHub
# → Request review
# → Address feedback
# → Merge to develop
```

## Directory Structure

```
.
├── frontend/
│   ├── app/          # Next.js app router
│   ├── components/   # Reusable React components
│   ├── public/       # Static assets
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── models/   # MongoDB schemas
│   │   ├── middleware/
│   │   └── index.ts  # Entry point
│   └── package.json
├── docs/            # Documentation
└── README.md
```

## Questions?

Open an issue or contact maintainers. We're here to help!

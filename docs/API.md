# API Documentation

## Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url.com/api`

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
Body: {
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "reader" | "author" (optional)
}
Response: { token, user }
```

#### Login
```
POST /auth/login
Body: {
  "email": "string",
  "password": "string"
}
Response: { token, user }
```

---

### Comics

#### Get All Comics
```
GET /comics?page=1&limit=12
Query: page, limit
Response: { comics: [], pagination: {} }
```

#### Get Trending Comics
```
GET /comics/trending
Response: [comic]
```

#### Get Comic by ID
```
GET /comics/:id
Response: comic (with chapters and author details)
```

#### Create Comic
```
POST /comics
Auth: Required (Author role)
Body: {
  "title": "string",
  "description": "string",
  "coverImage": "string (URL)",
  "genre": ["string"]
}
Response: { message, comic }
```

#### Submit Comic for Review
```
PATCH /comics/:id/submit
Auth: Required (Author role)
Response: { message, comic }
```

#### Approve Comic
```
PATCH /comics/:id/approve
Auth: Required (Editor/Admin role)
Response: { message, comic }
```

#### Reject Comic
```
PATCH /comics/:id/reject
Auth: Required (Editor/Admin role)
Body: { "reason": "string" }
Response: { message, comic }
```

---

### Users

#### Get Current User
```
GET /users/me
Auth: Required
Response: user
```

#### Get All Users (Admin only)
```
GET /users?page=1&limit=20
Auth: Required (Admin role)
Response: { users: [], pagination: {} }
```

#### Update User Role (Admin only)
```
PATCH /users/:id/role
Auth: Required (Admin role)
Body: { "role": "reader" | "author" | "editor" | "admin" }
Response: { message, user }
```

#### Delete User (Admin only)
```
DELETE /users/:id
Auth: Required (Admin role)
Response: { message }
```

---

## Error Responses

All errors follow this format:
```json
{
  "message": "Error description",
  "status": 400
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

Coming soon. Currently no rate limiting implemented.

---

## Webhooks

Coming soon.

---

## Testing API with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Comics
curl http://localhost:5000/api/comics

# Create Comic (with token)
curl -X POST http://localhost:5000/api/comics \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My Comic","description":"...","coverImage":"...","genre":["Action"]}'
```

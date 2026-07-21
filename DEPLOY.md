# Manga Comic Publishing Platform - Quick Deploy Guide

## 🚀 Deploy to Vercel (Frontend)

### Step 1: Push to GitHub ✅
Kode của bạn đã được push lên branch `develop`.

### Step 2: Connect Vercel
1. Vào https://vercel.com
2. Click "Add New" → "Project"
3. Chọn repository `nopro12/manga`
4. Vercel sẽ tự động detect Next.js project
5. Click "Deploy"

**Xong! Frontend sẽ chạy tự động.**

---

## 🚀 Deploy to Railway (Backend)

### Step 1: Connect Railway
1. Vào https://railway.app
2. Click "New Project" → "Deploy from GitHub Repo"
3. Chọn repository `nopro12/manga`
4. Railway sẽ tự detect backend folder

### Step 2: Add Environment Variables
Click vào project → Settings → Environment

Thêm các biến này:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/manga
JWT_SECRET=your-super-secret-key-here-change-this
NODE_ENV=production
PORT=5000
```

**Lấy MONGODB_URI từ đâu?**
1. Vào https://www.mongodb.com/cloud/atlas
2. Tạo account & cluster
3. Click "Connect" → "Connection String"
4. Copy chuỗi, thay `<password>` bằng password của bạn

### Step 3: Deploy
Railway sẽ tự động deploy sau khi add variables.

**Xong! Backend sẽ chạy tự động.**

---

## 🔗 Connect Frontend + Backend

1. Vào Vercel project settings
2. Tìm "Environment Variables"
3. Thêm:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app
   ```
   (Thay URL bằng backend URL của bạn từ Railway)

4. Vercel sẽ tự động redeploy

---

## ✅ Kiểm Tra Deploy

```bash
# Frontend
https://your-app.vercel.app

# Backend API
https://your-railway-app.railway.app/api/health
```

Nếu thấy `{"status":"OK"}` → Backend đang chạy ✅

---

## 🎯 Kết Quả Cuối Cùng

**Bấm vào link frontend là web chạy ngay:**

🌐 **Frontend**: https://your-app.vercel.app

⚙️ **Backend**: https://your-railway-app.railway.app

---

## ❓ Troubleshooting

**Lỗi: Connection refused**
- Kiểm tra `NEXT_PUBLIC_API_URL` đúng chưa
- Backend có đang chạy không (check Railway logs)

**Lỗi: MongoDB connection error**
- Kiểm tra `MONGODB_URI` có đúng không
- Kiểm tra IP whitelist trên MongoDB Atlas

**Lỗi: Page not found**
- Chờ Vercel redeploy xong (~2 phút)
- Clear browser cache

---

## 📝 Cheat Sheet

```bash
# Xem logs trên Vercel
# Vercel → Project → Deployments → Click deployment → Logs

# Xem logs trên Railway
# Railway → Project → Deployments → View Logs

# Thay đổi code
# Git push origin develop → Tự động redeploy
```

---

**Bạn đã sẵn sàng deploy! 🚀**

Chỉ cần:
1. Tạo MongoDB Atlas account
2. Vào Vercel → Add Project
3. Vào Railway → New Project
4. Add environment variables
5. Bấm Deploy
6. Chờ ~5 phút → Xong!

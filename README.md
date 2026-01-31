# 📚 ContentHub

**ContentHub** adalah aplikasi web berbasis **React + Node.js** yang menyediakan konten **artikel dan video** dengan sistem **membership berjenjang** (Basic, Premium, VIP).

Pengguna dapat membaca dan menonton konten sesuai batasan membership, serta melakukan upgrade untuk membuka akses lebih luas.

---

## 🚀 Features

- 🔐 **Authentication & Authorization (JWT)**
- 👤 **Membership System**
  - Basic (A): 3 Artikel & 3 Video
  - Premium (B): 10 Artikel & 10 Video
  - VIP (C): Unlimited
- 📄 **Article & Video Content**
- ⛔ **Content Access Limiter**
- 🔍 **Search Content (Backend-powered)**
- 📊 **Track User Content Access**
- 💳 **Upgrade Membership Page**
- 📱 **Responsive Layout (Desktop & Mobile)**
- 🎨 **Modern UI (Tailwind CSS)**

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React + TypeScript
- 🎨 Tailwind CSS
- 🌐 Axios
- 🧭 React Router
- 🎯 React Icons

### Backend
- 🟢 Node.js + Express
- 🐘 PostgreSQL
- 🔐 JWT Authentication
- 📦 Middleware-based Access Control

---

## 🗂️ Database Schema (Simplified)

```text
users
- id
- name
- email
- password
- membership_type (A | B | C)

contents
- id
- title
- type (article | video)
- body (TEXT, nullable)
- url (TEXT, nullable)
- thumbnail_url

user_access
- user_id
- content_id
```

# Clone repository
```
git clone https://github.com/glody71/Astronacci.git
```
# Masuk ke folder project
```
cd Astronacci
```
# Install backend dependencies
```
cd backend
npm install
cp .env.example .env
```

# Kembali ke root
```
cd ..
```
# Install frontend dependencies
```
cd frontend
npm install
```

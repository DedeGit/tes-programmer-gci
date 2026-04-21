# Fullstack Test Project (Laravel + Next.js)

Technical Test - PT Garuda Cyber Indonesia

Aplikasi Fullstack CRUD Post menggunakan Laravel sebagai Backend API dan Next.js sebagai Frontend dengan sistem authentication dan authorization.

---

# 🚀 Tech Stack

Backend:
- Laravel 10
- Laravel Sanctum
- MySQL
- REST API

Frontend:
- Next.js (App Router)
- React
- Axios
- DaisyUI
- Tailwind CSS

---

# 🧩 Features

## Authentication
- Register
- Login
- Logout
- Token-based authentication (Laravel Sanctum)

## Post Management
- Create Post
- Get All Posts (Pagination)
- Get Detail Post
- Update Post
- Delete Post

## Authorization
- Hanya user yang login bisa mengakses post
- User hanya bisa edit post miliknya
- User hanya bisa delete post miliknya
- User tidak bisa mengubah post orang lain

---

# 📁 Project Structure
```
gci-test/
│
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php
│   │   │   │   └── PostController.php
│   │   │   └── Middleware/
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   └── Post.php
│   │
│   ├── routes/
│   │   └── api.php
│   │
│   ├── database/
│   │   └── migrations/
│   │
│   └── .env
│
├── frontend/                # Next.js App
│   ├── app/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── posts/
│   │   │   ├── create/
│   │   │   ├── edit/
│   │   │   └── page.js
│   │   └── layout.js
│   │
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── PostForm.js
│   │   └── PostTable.js
│   │
│   ├── lib/
│   │   └── axios.js
│   │
│   └── package.json
│
└── README.md
```

## ⚙️ Setup Laravel
download composer and install (backend)
download node.js and install (frontend)

## ⚙️ Backend Setup (Laravel)
Masuk ke folder backend
```bash
cd backend
```
Install dependency
```bash
composer install
```
Copy env
```bash
cp .env.example .env
```
Setting Database
```bash
DB_DATABASE=gci_test
DB_USERNAME=root
DB_PASSWORD=
```
Generate Key
```bash
php artisan key:generate
```
Migrate Database
```bash
php artisan migrate
```
Jalankan Server
```bash
php artisan serve
```
Backend berjalan di:
```bash
http://127.0.0.1:8000
```

---

## 💻 Frontend Setup
Masuk ke folder frontend
```bash
cd frontend
```
Instal dependency
```bash
npm install
```
Jalankan
```bash
npm run dev
```
Frontend berjalan di:
```bash
http://localhost:3000
```

---

## 🔗 API Base URL
```bash
http://127.0.0.1:8000/api
```

---

## 🔐 API Endpoints

| Method | Endpoint        | Description |
| ------ | --------------- | ----------- |
| POST   | /api/register   | Register    |
| POST   | /api/login      | Login       |
| POST   | /api/logout     | Logout      |
| GET    | /api/posts      | List Posts  |
| GET    | /api/posts/{id} | Detail Post |
| POST   | /api/posts      | Create      |
| PUT    | /api/posts/{id} | Update      |
| DELETE | /api/posts/{id} | Delete      |

---

## 🎨 UI

Frontend menggunakan:

* Tailwind CSS (Tailwind V4)
* DaisyUI

Tujuan:

* Tampilan bersih
* Responsive
* Mudah digunakan
* Komponen sederhana sesuai kebutuhan test

---

## 📌 Technical Notes

1. Authentication

Menggunakan Laravel Sanctum untuk token authentication.

Setelah login, token disimpan di:
```bash
localStorage
```
Token digunakan untuk akses API protected.

2. Authorization

Backend menggunakan middleware dan policy:

* auth:sanctum
* post owner validation

Logic:

User hanya bisa:

* update post sendiri
* delete post sendiri

Jika mencoba edit post orang lain maka:
```bash
403 Forbidden
```

3. Pagination

Pagination dilakukan di backend Laravel:
```bash
/api/posts?page=1
```
Frontend mengambil data pagination dari response API.

4. Axios Configuration

Semua request API menggunakan Axios dengan baseURL:
```bash
http://127.0.0.1:8000/api
```
Authorization header:
```bash
Bearer token
```

---

## 👨‍💻 Author

Dede Fadillah

Technical Test Programmer
PT Garuda Cyber Indonesia

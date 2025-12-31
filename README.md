# 🎓 LMS-MERN – Modern Learning Management System

ShikhoHub is a comprehensive Learning Management System built on the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It offers a seamless experience for students to browse courses, while providing administrators with powerful tools for course management and user oversight.

---

## 🖼️ Preview

<p align="center">
  <img src="frontend/public/preview.png" alt="LMS Dashboard Preview" width="800" />
</p>

---

## 🔗 Live Demo : [ShikhoHub](https://shikhohub.vercel.app/)

---

## 🌟 Features

- 📚 **Course Management** – Create, update, and delete courses with ease.
- ⭐ **Ratings & Reviews** – Users can rate and review courses they have taken.
- 📅 **Booking System** – Streamlined booking flow for users to enroll in courses.
- 💳 **Secure Payments** – Integrated Stripe payment gateway for safe transactions.
- 🔐 **Authentication** – Secure user and admin authentication via Clerk.
- 🖼️ **Media Management** – Cloudinary integration for handling course image uploads.
- 🛠️ **Admin Dashboard** – Dedicated admin interface for managing the platform.
---

## 🛠️ Tech Stack

### 🧑‍💻 Frontend (Client)

- [React 19](https://react.dev/) – Component-based UI library
- [Tailwind CSS 4](https://tailwindcss.com/) – Utility-first CSS framework
- [Clerk](https://clerk.dev/) – Authentication and user management
- [Axios](https://axios-http.com/) – Promise-based HTTP client
- [Lucide React](https://lucide.dev/) – Beautiful & consistent icon toolkit
- [React Hot Toast](https://react-hot-toast.com/) – Toast notification library
- [i18next](https://www.i18next.com/) – Internationalization framework

### ⚙️ Backend (Server)

- [Express.js](https://expressjs.com/) – Node.js web application framework
- [MongoDB](https://www.mongodb.com/) – NoSQL database (via Mongoose)
- [Clerk Express](https://clerk.dev/docs/backend/express) – Clerk middleware for Express
- [Multer](https://github.com/expressjs/multer) – Middleware for handling file uploads
- [Cloudinary](https://cloudinary.com/) – Media storage and optimization
- [Stripe](https://stripe.com/) – Payment processing platform
- [Dotenv](https://www.npmjs.com/package/dotenv) – Environment variable management
- [Cors](https://expressjs.com/en/resources/middleware/cors.html) – Cross-origin resource sharing middleware

### 🛡️ Admin Panel

- [React 19](https://react.dev/) – Frontend for Admin Dashboard
- [Tailwind CSS 4](https://tailwindcss.com/) – Styling
- [Clerk](https://clerk.dev/) – Admin Authentication

---

## 📁 Project Structure

```bash
LMS-MERN/
│
├── frontend/               # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   └── pages/          # Main application pages
│   └── package.json
│
├── backend/                # Backend (Node + Express)
│   ├── routes/             # API routes (bookings, courses)
│   ├── controllers/        # Business logic
│   └── server.js           # Entry point
│
├── admin/                  # Admin Dashboard (React + Vite)
│   ├── src/
│   └── package.json
│
└── README.md               # Project documentation
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

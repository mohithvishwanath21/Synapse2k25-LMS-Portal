# Learning Management System (LMS)

A full-stack **Learning Management System** built with a focus on clean backend architecture, secure authentication, and real-world workflows. This project demonstrates practical experience with REST APIs, authentication, and deployment.

---

## ✨ Highlights

* JWT-based authentication & authorization
* Role-based access (Admin / Tutor / Student)
* Secure password hashing & reset via email
* RESTful API design with proper validation
* Rate limiting for sensitive endpoints
* Environment-based configuration
* Deployed and production-ready

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT, Passport.js
* bcrypt, Nodemailer

**Frontend**

* React.js
* Axios
* React Router

**Tools & Platforms**

* Git & GitHub
* Render (Deployment)
* Postman (API Testing)
* JIRA (Project Tracking)

---

## 📂 Project Structure

```
server/
├── controllers/
├── routes/
├── models/
├── middleware/
├── utils/
├── config/
└── index.js

client/
├── components/
├── pages/
└── services/
```

---

## 🔐 Authentication Flow

1. User registers or logs in
2. Passwords are securely hashed using bcrypt
3. JWT is issued and stored on the client
4. Protected routes are accessed using auth middleware
5. Forgot-password flow handled via secure email link / OTP

**Example:**

> A tutor logs in and accesses protected course and profile APIs using JWT authentication.

---

## 🌱 Environment Variables

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLIENT_URL=frontend_url
```

---

## ▶️ Run Locally

**Backend**

```
cd server
npm install
npm start
```

**Frontend**

```
cd client
npm install
npm run dev
```

---

## 🚀 Deployment

* Backend deployed on **Render**
* Frontend deployed separately
* CORS & port binding configured for production

---

## 📌 What I Learned

* Designing scalable REST APIs
* Implementing secure authentication systems
* Backend error handling & middleware patterns
* Real-world deployment and environment management
* Working with industry tools like JIRA & Postman

---

## 🔮 Future Improvements

* Course enrollment & progress tracking
* Admin analytics dashboard
* Payment integration
* Notification system

---

## 👨‍💻 Author

**Mohith**
CSE Student | Backend & DSA Enthusiast

---

⭐ If you find this project useful, consider giving it a star!

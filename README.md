## 🔐 Verifact – Authentication System

**Verifact** is a full-stack JWT-based authentication platform where users can securely register, verify accounts via email, and manage profiles with robust password recovery features.

This project combines a **Java + Spring Boot backend** with a modern **React + Vite frontend**, all styled with a clean yellow and white aesthetic.



### ✨ Why I Built This

Verifact was created as a production-ready authentication system to:

- Master **secure RESTful API development** using Java and Spring Boot
- Implement **JWT-based stateless authentication** with HTTP-only cookies
- Practice **React 18** concepts with modern hooks, routing, and state management
- Explore **Spring Security integration** with custom filters and configurations
- Apply **email service integration** for OTP verification and notifications
- Reinforce concepts in **password security**, **input validation**, and **error handling**

It's both a learning project and a portfolio piece demonstrating enterprise-level authentication patterns.

---

### 🏗️ System Architecture

The Verifact system follows a **layered Spring Boot architecture** with:

#### 🔧 Core Components
- **🔐 Security Layer**: JWT authentication with Spring Security
- **🌐 API Layer**: RESTful controllers for auth operations  
- **⚙️ Service Layer**: Business logic for user management
- **💾 Data Layer**: MySQL with JPA repositories
- **📧 Email Service**: SMTP integration for notifications
- **🎨 Frontend**: React SPA with yellow & white theming


### 🚀 Key Features

#### 🔐 **Authentication & Security**
- JWT-based stateless authentication with secure token storage
- HTTP-only cookies for XSS protection
- BCrypt password encryption with complexity validation
- Role-based access control with protected endpoints

#### 👤 **User Management**
- Email-validated user registration
- OTP-based account verification
- Secure password reset via time-limited tokens

#### 📧 **Email Integration**
- Welcome emails for new registrations
- OTP delivery for verification and password reset
- SMTP configuration with customizable templates

#### 🎨 **Modern Frontend**
- Responsive React interface with yellow & white design
- Fast Vite development with optimized builds
- Form validation with user-friendly error messages
- Smooth animations and loading states

---

### 📖 Subproject Details

Each part of the project has its own comprehensive README:

- 📦 **[Backend Documentation](./backend/README.md)**: Java + Spring Boot REST API
  

- 🎨 **[Frontend Documentation](./frontend/README.md)**: React + Vite SPA  
 


### 🔗 API Quick Reference

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/register` | POST | User registration | ❌ |
| `/verify-otp` | POST | Email verification | ❌ |
| `/login` | POST | User authentication | ❌ |
| `/reset-password` | POST | Password reset request | ❌ |
| `/update-password` | POST | Password update | ❌ |
| `/profile` | GET/PUT | Profile management | ✅ JWT |



### 🙌 Acknowledgements

- Built with ❤️ using open-source technologies
- Thanks to the **Spring Boot** and **React** communities for excellent documentation
- Inspired by modern authentication best practices and security standards

---

<div align="center">

**⭐ If this project helped you, please give it a star!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/Verifact-authentication-system-fullstack?style=social)](https://github.com/yourusername/Verifact-authentication-system-fullstack)

</div>

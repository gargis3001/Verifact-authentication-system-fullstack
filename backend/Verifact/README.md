## 🔧 Verifact Backend - Spring Boot Authentication API

Java Spring Boot backend for the **Verifact** authentication system. This service powers the RESTful APIs that manage user authentication, registration, and profile management, supporting a React-based frontend.

### 🚀 Technology Stack

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Runtime | Java | 21 | Application platform |
| Framework | Spring Boot | 3.5.4 | Application framework |
| Build Tool | Maven | 3.9.11 | Dependency management and build |
| Database | MySQL | Latest | User data persistence |
| Security | Spring Security | 6.x | Authentication and authorization |
| JWT | JJWT | 0.9.1 | Token generation and validation |
| ORM | Spring Data JPA | 3.x | Database abstraction layer |
| Email | Spring Mail | 3.x | Email notification services |
| Code Generation | Lombok | 1.18.38 | Boilerplate code reduction |

### 🌐 API Architecture

The backend exposes RESTful APIs over HTTP on `localhost:8080`. These APIs follow standard controller-service-repository architecture using Spring Boot conventions with JWT-based authentication.

#### 📋 Endpoint Summary

| HTTP Method | Endpoint | Purpose | Authentication |
|-------------|----------|---------|---------------|
| POST | `/register` | User registration | Public |
| POST | `/verify-otp` | Email verification | Public |
| POST | `/login` | User authentication | Public |
| POST | `/reset-password` | Password reset request | Public |
| POST | `/update-password` | Password update | Public |
| GET | `/profile` | Get user profile | JWT Required |
| PUT | `/profile` | Update user profile | JWT Required |

### 🔒 Security Features

* **JWT Authentication**: Stateless token-based authentication
* **BCrypt Encryption**: Secure password hashing  
* **HTTP-Only Cookies**: XSS protection for token storage
* **Input Validation**: Protection against malicious data
* **CORS Configuration**: Secure cross-origin requests

### 🚀 Features

* JWT-based stateless authentication with secure token management
* RESTful API endpoints for user registration, login, and profile management
* OTP-based email verification and password reset functionality
* Spring Boot and Spring Security architecture
* MySQL database integration with Spring Data JPA
* Clean layered structure: Controller → Service → Repository
* SMTP email service integration for notifications

### 🛠️ Quick Start

1. **Prerequisites**: Java 21, MySQL, Maven 3.9.11+
2. **Database**: Configure MySQL connection in `application.properties`
3. **Build**: `mvn clean install`
4. **Run**: `mvn spring-boot:run`
5. **Access**: API available at `http://localhost:8080`

## 📁 Architecture

Built with Spring Boot conventions for maintainable, scalable authentication services.

## ✅ Summary

The Verifact backend is a cleanly structured Spring Boot application designed to serve a comprehensive authentication system via REST APIs. It supports robust security practices with JWT-based stateless authentication, proper configuration isolation, modular architecture, and seamless integration readiness for modern React frontend frameworks.


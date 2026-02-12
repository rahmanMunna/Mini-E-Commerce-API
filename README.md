# Mini-E-Commerce-AP
## A robust e-commerce backend API built with NestJS, featuring JWT authentication, role-based authorization, session-based cart management, and comprehensive Swagger/Scalar API documentation.

## 🚀 Features
### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/Customer)
- Custom decorator for extracting user ID from headers

### Cart Management
- Session-based shopping cart
- Add, update, increase/decrease quantity, remove items
- User-specific cart isolation using x-user-id header

### API Documentation
- Swagger UI & Scalar documentation
- Request/response examples
- API endpoint testing interface

# Project setup : 
- At first clone the project to your local machine.
- cd backend (goto backend directory).
- install all the dependencies
```
npm i
```
- add a .env file to the to root directory (backend)
- configure the .env (as .env.eample given)
- make a db in postgres
- run the project :
```
npm run start:dev
```
- project will be run at :
```
http://localhost:3000/api/v1
```

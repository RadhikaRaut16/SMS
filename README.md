
# Student Management System
**Zest India IT Pvt Ltd — Full Stack Developer Assignment**

## Live Demo
- Frontend: http://localhost:5173
- Backend API: https://localhost:7100
- Swagger Docs: https://localhost:7100/swagger

## Demo Credentials
| Username | Password | Role |
|----------|----------|------|
| admin | Admin@123 | Administrator |
| user | User@123 | User |

---

## Tech Stack

### Backend
| Technology | Version |
|------------|---------|
| ASP.NET Core | 8.0 |
| Entity Framework Core | 8.0 |
| SQL Server | 2025 Express |
| JWT Bearer Authentication | 7.3.1 |
| Serilog | 8.0 |
| Swagger / OpenAPI | 6.5 |

### Frontend
| Technology | Version |
|------------|---------|
| React | 18.x |
| Vite | 5.x |
| Axios | 1.x |
| React Router DOM | 6.x |

---

## Project Structure
<img width="525" height="799" alt="image" src="https://github.com/user-attachments/assets/b7a8bc50-6db3-493e-859a-d2c2769c91c5" />




---

## Features

### Backend API
- JWT Authentication with Bearer Token
- Global Exception Handling Middleware
- Request Logging Middleware
- Serilog Logging (Console + File)
- Swagger UI with JWT support
- Layered Architecture (Controller → Service → Repository)
- Entity Framework Core with SQL Server
- Input Validation with Data Annotations
- Duplicate email check
- Structured API responses

### Frontend UI
- Login page with JWT authentication
- Dashboard with stats and charts
- Students list with search
- Add / Edit / Delete students
- Search student by ID
- API Reference page
- Responsive design

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | ❌ | Get JWT token |
| GET | /api/students | ✅ | Get all students |
| GET | /api/students/{id} | ✅ | Get student by ID |
| POST | /api/students | ✅ | Create new student |
| PUT | /api/students/{id} | ✅ | Update student |
| DELETE | /api/students/{id} | ✅ | Delete student |

---

## Database Schema
```sql
CREATE TABLE Students (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(100)   NOT NULL,
    Email       NVARCHAR(150)   NOT NULL UNIQUE,
    Age         INT             NOT NULL,
    Course      NVARCHAR(100)   NOT NULL,
    CreatedDate DATETIME2       NOT NULL DEFAULT GETUTCDATE()
);
```

---

## Setup Instructions

### Prerequisites
- .NET 8.0 SDK
- SQL Server 2025 Express
- Node.js 18+
- Visual Studio 2022
- VS Code (for React)

### Backend Setup

#### Step 1 — Clone repository
```bash
git clone https://github.com/RadhikaRaut16/SMS.git
cd SMS
```

#### Step 2 — Update connection string
Open `StudentManagement.API/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost\\SQLEXPRESS01;Database=StudentManagementDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

#### Step 3 — Run migrations
```bash
cd StudentManagement.API
dotnet ef database update
```

#### Step 4 — Run API
```bash
dotnet run
```

API runs at: https://localhost:7100
Swagger at: https://localhost:7100/swagger

---

### Frontend Setup

#### Step 1 — Go to React folder
```bash
cd student-management-react_ui
```

#### Step 2 — Install packages
```bash
npm install
```

#### Step 3 — Update API URL
Open `src/services/api.js`:
```js
const BASE_URL = 'https://localhost:7100/api'
```

#### Step 4 — Run React
```bash
npm run dev
```

React runs at: http://localhost:5173

---

## Sample API Request

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Admin@123"
}
```

### Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "username": "admin",
    "role": "Admin",
    "expiresAt": "2026-04-05T00:00:00Z"
  }
}
```

---

## Evaluation Criteria Met

| Criteria | Status |
|----------|--------|
| Code Quality | ✅ Clean, structured, commented code |
| Architecture | ✅ Layered — Controller, Service, Repository |
| Error Handling | ✅ Global middleware + field validation |
| Security | ✅ JWT Bearer + CORS + input validation |
| API Functionality | ✅ All CRUD operations working |

### Bonus Features
| Feature | Status |
|---------|--------|
| React UI | ✅ Complete dashboard with all pages |
| Swagger Docs | ✅ With JWT authorization |
| Serilog Logging | ✅ Console + file logging |
| Request Logging | ✅ Every request logged with duration |

---

## Screenshots

### Login Page
- JWT secured login
- Demo credentials shown

### Dashboard
- Total students count
- Average age
- Course distribution chart
- Recent students table

### Students Page
- Search by name, email, course
- Search by ID
- Edit and Delete actions

### Add Student
- Form validation
- Duplicate email check

---

## Author
**Radhika Raut**
Zest India IT Pvt Ltd — Full Stack Developer Assignment

## Repository
https://github.com/RadhikaRaut16/SMS

<div align="center">

# School Management System

**A complete, role-based school management platform for multi-school organizations.**

Built with Laravel, Inertia.js, React, and Tailwind CSS.

[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Inertia](https://img.shields.io/badge/Inertia.js-2.x-9553E9?logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com)

</div>

---

## Overview

**School Management System** is a full-featured platform designed for educational organizations that operate across multiple schools and campuses. It provides a unified interface for administrators, principals, teachers, and supporting staff, with **role-based access control** ensuring every user sees only what is relevant to their profession.

The system centralizes everything a modern school needs  academic sessions, student records, examinations, results, fees, library, transport, HR, and more  into a single, consistent, and secure application.

---

## Key Features

### Multi-School and Multi-Campus
- Manage multiple schools under a single organization
- Each school can have one or more campuses
- Campus-scoped data isolation for privacy and control

### Role-Based Access Control
Granular permissions tailored to each role:

| Role | Scope and Responsibilities |
|---|---|
| **Super Admin** | Full system access  manages organizations, schools, campuses, users, and all modules |
| **Principal** | Manages their assigned school(s) and all associated campuses |
| **Vice Principal** | Manages a single assigned campus, including its staff and students |
| **Teacher** | Manages their classes, attendance, and marks entry |
| **Accountant / Finance** | Handles fee structures, invoices, payments, and scholarships |
| **Librarian** | Manages books, categories, and library transactions |
| **Receptionist** | Handles admissions, student enquiries, and front-desk operations |
| **HR Manager** | Manages staff, payroll, leave requests, and attendance |
| **Other Roles** | Each receives a focused dashboard with only relevant permissions |

### Academic Management
- Academic sessions (school years) with current-session tracking
- Standards (grades/classes), sections, and subjects
- Subject assignment per standard
- Timetable and time-slot management
- Holiday calendar

### Student Management
- Complete student profiles with admissions
- Guardians and relationships
- Academic records with enrollment history
- Attendance tracking (daily and subject-wise)
- Health records, vaccinations, and checkups
- Student documents and transport assignments

### Examination and Results
- Exam types, exams, and exam schedules
- Per-exam marks entry with an inline grid interface
- Grading systems with percentage ranges and GPA
- Automatic result summaries with class positions
- Printable report cards with subject-wise breakdown

### Finance
- Fee types and fee structures per standard/session
- Fee invoices with line items
- Payment recording with multiple payment methods
- Scholarships and concessions
- Receipts and outstanding balance tracking

### Library
- Book categories and inventory
- Book issuance, returns, and transaction history
- Member records linked to students and staff

### Transport
- Vehicles, routes, and route stops
- Student transport assignments
- Route-level logistics

### HR and Payroll
- Staff records and documents
- Leave types and leave requests
- Payroll processing and payslips
- Staff and teacher attendance

### Inventory and Assets
- Coming Soon

### Security
- Session-based authentication
- Fine-grained permission middleware
- Campus and school scoping middleware
- Audit logs for critical actions

---

## Tech Stack

### Backend
- **Laravel 11**  modern PHP framework
- **MySQL**  relational database
- **Inertia.js**  server-driven single-page application glue
- **Spatie Laravel Permission**  roles and permissions
- **Laravel Breeze**  authentication scaffolding

### Frontend
- **React 18**  component-based UI
- **Inertia.js React Adapter**  seamless Laravel-React bridge
- **Tailwind CSS 3**  utility-first styling
- **Heroicons**  outline icon set
- **Vite**  fast build tooling

---

## Screenshots

> Add screenshots of the dashboard, marks entry, report card, and fee receipt here.

```markdown
![Dashboard](docs/screenshots/dashboard.png)
![Marks Entry](docs/screenshots/marks-entry.png)
![Report Card](docs/screenshots/report-card.png)
![Fee Receipt](docs/screenshots/fee-receipt.png)
```

---

## Requirements

- **PHP** 8.2 or higher
- **Composer** 2.x or higher
- **Node.js** 18.x or higher and **npm** 9.x or higher
- **MySQL** 8.0 or higher
- **Git**

---

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Noman-ahmed-memon/School-Management-System.git
cd School-Management-System
```

### 2. Install PHP dependencies
```bash
composer install
```

### 3. Install frontend dependencies
```bash
npm install
```

### 4. Configure environment
```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` and set your database credentials:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=school_management
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Create the database
```sql
CREATE DATABASE school_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Run migrations and seeders
```bash
php artisan migrate --seed
```

This creates all tables and seeds:
- Roles and permissions
- Default super admin user
- Sample academic data (sessions, standards, subjects)

### 7. Start the development servers
In two separate terminals:
```bash
php artisan serve
```
```bash
npm run dev
```

Visit: **http://localhost:8000**

---

## Default Login

The seeder creates a super admin account. Check `database/seeders/SuperAdminSeeder.php` for the exact credentials used in your installation.

**Change default credentials immediately after first login**, especially before deploying to production.

---

## Project Structure

```
school-management/
├── app/
│   ├── Http/
│   │   ├── Controllers/        # Organized by module (School, Student, Result, etc.)
│   │   ├── Middleware/         # Role, permission, campus, school scoping
│   │   └── Requests/           # Form request validation
│   ├── Models/                 # Eloquent models
│   ├── Policies/               # Authorization policies
│   ├── Services/               # Business logic services
│   └── Traits/                 # Reusable model behaviors
├── database/
│   ├── migrations/             # Database schema
│   └── seeders/                # Seed data
├── resources/
│   ├── css/                    # Tailwind entry
│   └── js/
│       ├── components/         # Reusable UI components
│       ├── layouts/            # Auth and app layouts
│       └── pages/              # Inertia pages, mirrored to controllers
├── routes/
│   ├── web.php                 # Main application routes
│   ├── auth.php                # Authentication routes
│   └── settings.php            # User settings routes
└── public/                     # Web root
```

---

## Roles and Permissions Model

Permissions are named using a `module.action` convention:

```
academic_sessions.view
academic_sessions.create
academic_sessions.edit
academic_sessions.delete

students.view
students.create
...

results.manage
results.view
results.publish
```

Each role is assigned a curated set of permissions. Controllers check them via the `authorizePermission()` helper, ensuring consistency across every request.

**Scoping:**
- `scopeQuery()` automatically filters records by campus/school based on the logged-in user
- Middleware (`EnsureCampusAccess`, `EnsureSchoolSelected`) validates access at the route level

---

## Development Workflow

### Run everything
```bash
composer run dev
```

### Run tests
```bash
php artisan test
# or
./vendor/bin/pest
```

### Format code
```bash
./vendor/bin/pint
```

### Build frontend for production
```bash
npm run build
```

---

## Roadmap

- [ ] Parent portal for results and attendance
- [ ] SMS and email notifications for events and fees
- [ ] Attendance biometric device integration
- [ ] Bulk student import via CSV
- [ ] Multi-language support
- [ ] REST API for mobile apps
- [ ] Dashboard analytics with charts
- [ ] Two-factor authentication

---

## Contributing

This project is primarily a personal build, but suggestions and improvements are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Author

**Noman Ahmed Memon**
- GitHub: [@Noman-ahmed-memon](https://github.com/Noman-ahmed-memon)

---

<div align="center">

**Built with care for schools that deserve better flow.**

</div>

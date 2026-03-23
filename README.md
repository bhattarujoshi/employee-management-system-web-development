# 🏢 WorkForce — Employee Management System

A fully responsive, production-quality Employee Management System built with
plain HTML, CSS, and JavaScript — **no frameworks, no dependencies, no build step.**

---

## 📁 Folder Structure

```
ems/
├── index.html              ← Entry point — open this in a browser
│
├── css/
│   ├── variables.css       ← CSS custom properties (colors, fonts, radii)
│   ├── layout.css          ← App shell, sidebar, topbar, content area, responsive
│   └── components.css      ← Cards, buttons, tables, badges, modals, forms, etc.
│
├── js/
│   ├── data.js             ← All seed data (employees, leaves, depts, etc.)
│   ├── utils.js            ← Shared helpers (toast, modal, formatting, CSV export)
│   ├── nav.js              ← Navigation, sidebar collapse, mobile menu
│   ├── dashboard.js        ← Dashboard charts and activity feed
│   ├── employees.js        ← Employee CRUD, filter, sort, pagination
│   ├── departments.js      ← Department cards and add department
│   ├── attendance.js       ← Attendance table and monthly calendar
│   ├── leaves.js           ← Leave requests, approve/reject, apply leave
│   ├── payroll.js          ← Payroll sheet generation
│   ├── performance.js      ← Performance reviews
│   ├── announcements.js    ← Post, delete, and display announcements
│   ├── reports.js          ← Report cards and salary distribution chart
│   └── app.js              ← Initialisation (runs on DOMContentLoaded)
│
└── pages/
    └── dashboard.html      ← Standalone dashboard panel markup (reference)
```

---

## 🚀 How to Run

**Option A — Just double-click:**
Open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari).
No server required.

**Option B — Local dev server (recommended for VS Code):**
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

**Option C — Python HTTP server:**
```bash
cd ems
python -m http.server 8080
# Open http://localhost:8080
```

---

## ✨ Features

| Module            | Features |
|-------------------|---------|
| **Dashboard**     | Stat cards, department bar chart, status donut chart, activity feed, announcement preview |
| **Employees**     | Full CRUD (add/edit/view/delete), search, filter by dept/status, sort, pagination, CSV export |
| **Departments**   | Visual department cards, headcount, budget, manager, add new departments |
| **Attendance**    | Daily attendance table (check-in/out, hours, status), monthly calendar heatmap |
| **Leave Mgmt**    | Apply leave, approve/reject, filter by status, live pending badge |
| **Payroll**       | Auto-calculated basic/allowances/deductions/net pay, process payroll, send payslips |
| **Performance**   | Score bars, star ratings, goals-met %, add reviews |
| **Announcements** | Post with categories, delete, rich display |
| **Reports**       | Report launchers + salary distribution chart |
| **Settings**      | Company info form, notification toggles |

---

## 🎨 Design

- **Dark theme** with CSS custom properties — easy to re-skin via `css/variables.css`
- **Fully responsive** — works on mobile, tablet, and desktop
- **Collapsible sidebar** on desktop, hamburger menu on mobile
- **Google Fonts**: Syne (headings) + DM Sans (body)

---

## 🛠️ Customisation

### Change the colour scheme
Edit `css/variables.css` — all colours are CSS variables.

### Add a new employee field
1. Add the field to the `employees` array in `js/data.js`
2. Add a form input in the `#emp-modal` in `index.html`
3. Read/write the field in `openEmpModal` and `saveEmployee` in `js/employees.js`
4. Display it in `viewEmployee` (profile modal) and the table in `renderEmpTable`

### Connect to a real backend
Replace the array mutations in each JS module with `fetch()` calls to your REST API.
The data shapes are all in `js/data.js`.

---

## 📦 Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript (ES6+)
- Google Fonts (loaded via CDN — requires internet for fonts)
- Zero npm packages, zero build tools

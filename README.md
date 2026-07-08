# FitFlex — Gym Membership Management System

A project-based web application built with React, React Router v6, Axios, and JSON Server as a REST API backend. Covers complete CRUD operations, authentication, protected routing, and a multi-module dashboard — designed as a batch training project for frontend development learners.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Vite |
| HTTP Client | Axios |
| Backend (Mock) | JSON Server |
| Notifications | React Toastify |
| Auth | localStorage |

---

## Features

- **Authentication** — Register and Login against a `/register` resource, session stored in localStorage, protected routes via `PrivateRoute`
- **Members** — list, create, and per-member actions: Pay, Refund, Upgrade Plan, Delete (with cascading delete of related payments and PT requests)
- **Payment History** — full ledger with type filter (All / Payment / Refund) and revenue summary, sorted by date
- **PT Requests** — submit personal training requests, staff can approve or reject inline
- **Home Dashboard** — live stats (active members, net revenue, pending PT requests) and a membership plan showcase (Basic / Premium / Elite)

---

## Project Structure

```
fitflex-gym-management/
├── backend/
│   └── db.json                 # REST API data (register, members, payments, ptRequests)
├── public/
│   └── favicon.svg
├── src/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── MembersFolder/
│   │   ├── MemberCard.jsx      # Pay / Refund / Upgrade / Delete actions
│   │   └── CreateMember.jsx
│   ├── components/
│   │   ├── Card1.jsx           # Dashboard stats
│   │   └── Card2.jsx           # Plan showcase
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── Navbar.jsx
│   │   ├── Members.jsx
│   │   ├── PaymentHistory.jsx
│   │   └── PTRequests.jsx
│   ├── utils/
│   │   ├── api.js              # Axios instance (baseURL)
│   │   ├── PrivateRoute.jsx    # Auth guard
│   │   └── plans.js            # Shared plan pricing
│   ├── App.jsx
│   ├── Layout.jsx
│   ├── main.jsx
│   └── global.css
├── index.html
├── package.json
└── vite.config.js
```

---

## Setup & Run

**Step 1 — Install dependencies:**
```bash
npm install
```

**Step 2 — Start JSON Server (REST API backend) in Terminal 1:**
```bash
npm run server
```
Runs at `http://localhost:3001`

**Step 3 — Start React dev server in Terminal 2:**
```bash
npm run dev
```
Runs at `http://localhost:5173`

> Both terminals must be running at the same time.

---

## Demo Login

| Field | Value |
|---|---|
| Email | admin@fitflex.com |
| Password | admin123 |

Or register a new account from `/register`.

---

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/register` | Login lookup |
| POST | `/register` | New account |
| GET | `/members` | List all members |
| POST | `/members` | Add a member |
| PATCH | `/members/:id` | Pay / Refund / Upgrade plan |
| DELETE | `/members/:id` | Remove a member |
| GET | `/payments?_sort=date&_order=desc` | Payment history |
| POST | `/payments` | Record a payment or refund |
| GET | `/ptRequests?_sort=requestDate&_order=desc` | PT request list |
| POST | `/ptRequests` | Submit a PT request |
| PATCH | `/ptRequests/:id` | Approve or reject a request |

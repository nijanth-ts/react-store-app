# React Store Application
A simple eCommerce React application with admin product management using **React**, **React Router**, and **JSON Server**.

---

## Features
* Product Listing with Pagination
* Search, Filter & Sort Products
* Add / Edit / Delete Products (Admin Dashboard)
* Form Validation with Accessibility
* Confirmation Modal for Delete
* No Data Handling
* Responsive UI

---

## Tech Stack
* **Frontend:** React, React Router, CSS Modules
* **Backend:** JSON Server
* **State Management:** React Hooks
* **Build Tool:** Vite

---
## 🚀 Getting Started

## ▶️ Run JSON Server (Backend)

From project **root folder**:

```bash
npx json-server --watch db.json --port 3001
```

API Endpoint:

```
http://localhost:3001/products
```

---

## ▶️ Run React App (Frontend)

```bash
npm install
npm run dev
```

Open browser:

```
http://localhost:3000
```

---

## 🧪 Admin Routes

* Add Product: `/admin`
* Edit Product: `/admin/:id`

---

## 📝 Notes

* JSON Server is used as a mock backend
* Data is persisted in `db.json`
* Designed with reusable components and clean UI

---
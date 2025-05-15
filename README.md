# 🛒 E-Commerce GraphQL API (Vanilla PHP + React)

## 📌 Project Summary

A full-stack e-commerce platform built with **vanilla PHP** and **React**, following core **Object-Oriented Programming (OOP)** principles, **MVC architecture**, and leveraging **polymorphism** to support modular, scalable code. 

The backend features a **GraphQL API** designed from scratch to enable clean separation of concerns and efficient resolution of product and attribute data.

---

## 🚀 Features

- ✅ **GraphQL Schema Design**  
  Defined distinct `Product`, `Attribute`, `Category`, `Tech`, `Clothes`, `Size`, `Capacity`, `Color`, `Usb`, `Keyboard` types, each resolved through dedicated controller and resolver classes.

- 🔁 **Schema Abstraction & Polymorphism**  
  Shared logic is abstracted in a reusable `BaseSchema` class, supporting polymorphic schema behavior across entity types.

- 🔧 **Dynamic Schema Initialization**  
  Eliminated hardcoded conditional checks in favor of a dynamic schema entry point for cleaner and more scalable query resolution.

- ⚙️ **Custom GraphQL Handler**  
  Implemented robust error handling, JSON request parsing, and PSR-4 autoloading in a lightweight custom PHP handler.

- ⚛️ **React Frontend**  
  Built a React-based frontend using Apollo Client to fetch and render data from the GraphQL API dynamically.

- 🧩 **Modular Attribute Resolution**  
  Backend structure supports future expansion: attribute types are resolved independently from products and can be queried as standalone entities.

---

## 🛠️ Tech Stack

- **Backend:** Vanilla PHP, GraphQL (Webonyx), OOP, MVC, Polymorphism, PSR-4 Autoloading  
- **Frontend:** React, Apollo Client, Booststrap, CSS, Axios, Bootstrap Icons, Dotenv, React Router Dom

---


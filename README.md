# 📝 Frontend - Mini Blogging Platform

This is the frontend of a **Mini Blogging Platform** built using **React**, **TypeScript**, **Material UI (MUI)**, and **React Router v6**. It interacts with a backend API to support user authentication, post creation, and user profile management.

---

## 🚀 Features

- 🔐 User Sign Up and Sign In (JWT-based auth)
- ✏️ Create, update, and delete blog posts
- 🧑 View all posts or only your own
- 🖌️ Responsive UI with Material UI
- 🌐 React Router for seamless routing

---

## ⚙️ Tech Stack

| Tool            | Description                       |
| --------------- | --------------------------------- |
| React 19        | Frontend UI library               |
| TypeScript      | Static typing                     |
| MUI v7          | Material UI for design components |
| React Router v6 | Routing between pages             |
| Emotion         | Styling engine                    |

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Damu8185/blogify-ui.git
cd blogify-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/home` in your browser.

---

## 🌐 API Configuration

Ensure your backend server is running and update the Axios base URL accordingly in your API service file (e.g., `src/services/api.ts`):

```ts
axios.defaults.baseURL = "http://localhost:5000/api";
```

---

## 🧪 Testing

```bash
npm test
```

Uses React Testing Library and Jest.

---

## 📄 Available Scripts

| Script      | Description                      |
| ----------- | -------------------------------- |
| `npm run dev` | Runs the app in development mode |
| `npm build` | Builds the app for production    |
| `npm test`  | Runs the test suite              |

---

## 📌 Notes

- Global state is managed using React Context API.
- Built with CRA (Create React App) and supports TypeScript out of the box.

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

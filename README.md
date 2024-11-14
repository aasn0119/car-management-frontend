# Car Management Application - Frontend

This is the frontend of the **Car Management Application**, built with **React**, **Vite**, and **Tailwind CSS**. It provides a rich user interface to manage car records, perform CRUD operations, and manage user authentication. This application is designed to work seamlessly with the backend and is fully responsive to provide an optimal experience across devices.

---

### Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Pages and Routes](#pages-and-routes)
- [Styling](#styling)
- [Contributing](#contributing)

---

### Overview

This project serves as the frontend part of the **Car Management Application**, allowing users to:

- Register, log in, and authenticate.
- Manage a list of cars, including creating, viewing, editing, and deleting car entries.
- Upload images of cars and display them in the UI.
- Access car details in a detailed, well-organized view.

The project has been developed using modern web technologies and follows best practices to ensure performance and scalability.

---

### Features

- **User Authentication**:
  - Registration and login functionality with session management.
  - Password encryption and secure authentication using JWT (JSON Web Tokens).
- **Car Management**:
  - **Car List**: View all cars in a user-friendly dashboard.
  - **CRUD Operations**: Create, Read, Update, Delete car entries.
  - **Image Upload**: Upload up to 10 images per car to visually showcase the vehicles.
  - **Filters**: Filter cars based on parameters like make, model, year, etc.
- **Responsive Design**:

  - Fully responsive using **Tailwind CSS** for optimized mobile and desktop views.

- **Error Handling**:
  - Graceful error handling and validation messages for user input, authentication failures, and API errors.

---

### Technologies

- **React**: A popular JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server that leverages modern browser features.
- **Tailwind CSS**: Utility-first CSS framework for creating responsive, customizable designs.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router**: Declarative routing for navigating between pages.
- **JWT (JSON Web Tokens)**: Used for authentication and authorization in the app.
- **Form Validation**: Using React Hook Form and Yup for easy and scalable form validation.

---

### Project Structure

```bash
.
├── public/                   # Public assets (images, favicon, etc.)
├── src/
│   ├── assets/               # Static files like images
│   ├── components/           # Reusable UI components (Button, Input, etc.)
│   ├── pages/                # Page components (CarList, LoginPage, etc.)
│   ├── services/             # API and utility functions
│   ├── store/                # Redux or Context API for state management
│   ├── styles/               # Tailwind customizations and global styles
│   ├── App.jsx               # Main application component
│   ├── index.js              # Entry point of the React app
│   └── router/               # React Router configuration
├── .env                      # Environment variables for API configurations
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

---

### Getting Started

#### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

#### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd car-management-frontend
   ```

2. Install the required dependencies using npm or yarn:

   ```bash
   npm install
   ```

---

### Environment Variables

The frontend may require certain environment variables for configuration, such as the API base URL for the backend.

1. Create a `.env` file in the root directory of the project.
2. Add the following variables (customize based on your environment):

   ```plaintext
   VITE_API_BASE_URL=https://your-backend-url.com/api
   VITE_AUTH_SECRET=your-jwt-secret
   ```

3. In `src/api/axiosConfig.js`, Axios will automatically use these variables to configure the base API URL:

   ```javascript
   import axios from "axios";

   const axiosInstance = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
   });

   export default axiosInstance;
   ```

---

### Running Locally

1. Start the development server by running the following command:

   ```bash
   npm run dev
   ```

2. Open your browser and visit `http://localhost:3000` to view the app.

---

### Deployment

To deploy the frontend to a cloud platform, follow these steps:

#### 1. **Push Code to GitHub/GitLab**:

- Push your code to a version control system such as GitHub or GitLab.

#### 2. **Deploy on Vercel**:

- Go to [Vercel](https://vercel.com) and sign in with your account.
- Create a new project and link your GitHub repository.
- Set the necessary environment variables (e.g., `VITE_API_BASE_URL`) in the Vercel dashboard.
- Vercel will automatically deploy the app and provide a live URL.

#### 3. **Access the Frontend**:

- Once deployed, Vercel provides a public URL where you can access the live app.

---

### Pages and Routes

| Route            | Component       | Description                          |
| ---------------- | --------------- | ------------------------------------ |
| `/login`         | `LoginPage`     | User login page.                     |
| `/register`      | `RegisterPage`  | User registration page.              |
| `/cars`          | `CarListPage`   | Dashboard displaying a list of cars. |
| `/cars/create`   | `CarCreatePage` | Page to create a new car entry.      |
| `/cars/:id`      | `CarDetailPage` | View details of a specific car.      |
| `/cars/edit/:id` | `CarUpdatePage` | Edit an existing car entry.          |

---

### Styling

The app is styled using **Tailwind CSS**. Tailwind offers utility classes that enable rapid development of responsive and modern UIs. Some key details:

- **Global Styles**: Global styling is set up in `src/styles/global.css`. Tailwind’s pre-defined utility classes are extended and customized as needed.
- **Custom Tailwind Configuration**: We use `tailwind.config.js` to configure custom themes, colors, and breakpoints.

Example configuration in `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50",
        secondary: "#FFC107",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
```

This allows for a highly customizable and responsive layout, adhering to modern design standards.

---

### Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository and create a new branch.
2. Make your changes, ensuring code quality and consistency.
3. Test your changes locally.
4. Create a pull request with a detailed description of your changes.

# Simple Card List Application

A full-stack web application that displays products in a responsive card grid. Users can view and delete product cards.

## Tech Stack

- **Frontend:** React, Material UI, Axios
- **Backend:** Node.js, Express.js

---

## How to Launch

### Prerequisites

- Node.js (v16 or higher)
- npm

---

### 1. Backend

```bash
# Navigate to the backend directory
cd StarterCode/backend

# Install dependencies
npm install

# Start the backend server
node index.js
```

The backend will run at **http://localhost:5000**

> To use nodemon for auto-reload during development:
> ```bash
> npx nodemon index.js
> ```

---

### 2. Frontend

Open a **new terminal window**, then:

```bash
# Navigate to the frontend directory
cd StarterCode/frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will open automatically at **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all products (with random images) |
| DELETE | `/api/products/:id` | Delete a product by ID |

---

## Features

- Responsive card grid (1 / 2 / 3 columns depending on screen size)
- Product cards show name, price, description, and a random image
- Delete button removes the card from both the frontend and backend
- Data is always fetched from the backend — no hard-coded data in the frontend
- Proper CORS configuration so frontend and backend communicate seamlessly

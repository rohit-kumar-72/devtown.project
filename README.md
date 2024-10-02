# MERN Stack Project

This is a **MERN Stack** project that contains both the **Frontend** and **Backend** code in separate folders.

## Project Structure

```
.
├── backend      # Backend (Node.js, Express, MongoDB)
├── frontend     # Frontend (React.js)
└── README.md    # Project Documentation
```

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rohit-kumar-72/devtown.project.git
cd devtown.project
```

### 2. Install dependencies for both `frontend` and `backend`

Navigate into both folders and run `npm install` to install the dependencies.

#### Backend Setup

```bash
cd backend
npm install
```

#### Frontend Setup

```bash
cd ../frontend
npm install
```

### 3. Set up environment variables

#### Backend

In the `backend` folder, create a `.env` file and add the required environment variables. Here's an example:

```env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

Make sure to replace `your-mongodb-uri` and `your-jwt-secret` with your actual values.

### 4. Run the project

You can run both the frontend and backend simultaneously using the following commands:

#### Running Backend

In the `backend` folder:

```bash
npm run dev
```

#### Running Frontend

In the `frontend` folder:

```bash
npm run dev
```

### 5. Open the project

Once both the frontend and backend are running, open your browser and visit:

```
http://localhost:5173


Your frontend should be live, and it will communicate with the backend running on `http://localhost:8000`.

```
## you can also use live link of project to test it [click here](https://devtown-omega.vercel.app/)

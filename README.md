# PhishGuard AI

AI-powered phishing detection system with a React frontend and Node.js/Prisma/MongoDB backend.

## Project Structure

- **frontend/**: React + Vite + Tailwind CSS application.
- **backend/**: Node.js + Express + Prisma + MongoDB API.

## Local Development

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### Setup

1. **Root Installation**
   ```sh
   npm run install:all
   ```

2. **Backend Configuration**
   - Navigate to `backend/`
   - Create a `.env` file (copied from `.env.example`)
   - Set `DATABASE_URL` to your MongoDB connection string.
   - Run `npx prisma generate`

3. **Running the Application**
   You can start both services from the root:
   ```sh
   # Start frontend (localhost:8080)
   npm run dev:frontend

   # Start backend (localhost:5000)
   npm run dev:backend
   ```

## Technologies Used

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion.
- **Backend**: Node.js, Express, Prisma, MongoDB.
- **AI/ML**: Tesseract.js for OCR, Custom heuristic analysis for phishing detection.

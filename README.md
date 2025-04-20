# REST Client Application

A REST client application built with Next.js and MikroORM, similar to POSTMAN but with a focus on request history and efficient data handling.

## Features

- Make HTTP requests (GET, POST, PUT, DELETE, PATCH)
- View request history with pagination
- Store request/response data in PostgreSQL
- Modern UI with Tailwind CSS
- Real-time response display
- Request history tracking

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_NAME=rest_client_db
   ```

4. Create the database:

   ```bash
   createdb rest_client_db
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js 14
- TypeScript
- MikroORM
- PostgreSQL
- Tailwind CSS
- React Query
- Headless UI
- Axios

## Project Structure

- `src/app/` - Next.js app router pages and API routes
- `src/components/` - React components
- `src/lib/` - Utility functions and database configuration
- `src/lib/entities/` - MikroORM entities

## License

MIT

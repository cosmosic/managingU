# Project Setup README

## Overview
This README provides instructions to set up and run the Task Management and Collaboration Tool locally.

## Prerequisites
- Node.js (v14 or later)
- npm
- Supabase account

## Steps to Setup the Project

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_name>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase
1. Go to [Supabase](https://supabase.com/) and create an account if you don't have one.
2. Create a new project.
3. Get your project's API URL and Anon Key from the Supabase dashboard.
4. Set up your environment variables by creating a `.env` file in the root of your project:

```bash
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_supabase_anon_key>
DATABASE_URL=<your_database_url>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your_nextauth_secret>
```

### 4. Set Up Prisma
1. Generate the Prisma client:

```bash
npm prisma generate
```

2. Push the Prisma schema to your Supabase database:

```bash
npm prisma db push
```

### 5. Run the Development Server
Start the Next.js development server:

```bash
npm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 7. Testing
To run tests, use the following command:

```bash
npm test
```

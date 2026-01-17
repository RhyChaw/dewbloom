# Dewbloom - Educational Gamified App

Production-ready Next.js App Router application with API routes, Prisma ORM, and Neon PostgreSQL.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Deployment**: Vercel
- **Authentication**: bcrypt (admin only)
- **Language**: JavaScript/TypeScript

## Project Structure

```
dewbloom/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed script for admin user
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── users/
│   │   │   │   └── anonymous/  # POST /api/users/anonymous
│   │   │   ├── modules/       # GET /api/modules
│   │   │   │   └── [moduleId]/
│   │   │   │       └── lessons/ # GET /api/modules/[moduleId]/lessons
│   │   │   ├── progress/      # POST /api/progress/complete
│   │   │   │   └── [userId]/  # GET /api/progress/[userId]
│   │   │   └── admin/
│   │   │       └── login/     # POST /api/admin/login
│   │   └── admin/             # Admin pages (protected)
│   ├── lib/
│   │   ├── prisma.js          # Prisma client singleton
│   │   └── auth.js             # Admin authentication helpers
│   └── middleware.js          # Route protection middleware
├── .env.example               # Environment variables template
└── package.json
```

## Local Setup

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Neon PostgreSQL database (free tier available at https://neon.tech)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dewbloom
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Neon PostgreSQL database**
   - Create a free account at https://neon.tech
   - Create a new project and database
   - Copy your connection string from the Neon dashboard
   - It will look like: `postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and paste your Neon `DATABASE_URL`:
   ```
   DATABASE_URL=postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

5. **Set up Prisma**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Run migrations to create database tables
   npm run db:migrate
   
   # Seed the database with admin user
   npm run db:seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Verify the API is running**
   - Open http://localhost:3000 in your browser
   - View API docs: http://localhost:3000/api/users/anonymous (or any endpoint)
   - Test admin login: POST http://localhost:3000/api/admin/login

## API Endpoints

### Base URL
- Local: `http://localhost:3000/api`
- Production: `https://your-domain.vercel.app/api`

### Endpoints

#### Users
- `POST /api/users/anonymous` - Create a new anonymous user
  - Response: `{ "id": "uuid", "created_at": "iso-timestamp" }`

#### Modules
- `GET /api/modules` - Get all modules (ordered by order_index)
  - Response: Array of module objects
- `GET /api/modules/[moduleId]/lessons` - Get all lessons for a module
  - Response: Array of lesson objects

#### Progress
- `POST /api/progress/complete` - Mark a lesson as completed
  - Request Body:
    ```json
    {
      "user_id": "uuid",
      "lesson_id": "uuid",
      "score": 85  // optional
    }
    ```
  - Response: Progress object with `xp_earned`
- `GET /api/progress/[userId]` - Get all progress for a user
  - Response: Array of progress objects

#### Admin
- `POST /api/admin/login` - Admin login
  - Request Body:
    ```json
    {
      "username": "admin",
      "password": "changeme123"
    }
    ```
  - Response: Sets HTTP-only cookie and returns success message

## Database Models

### User (Anonymous)
- `id` (UUID, primary key)
- `created_at` (timestamp)

### Module
- `id` (UUID, primary key)
- `title` (string)
- `skill_type` (string: mindfulness, distress_tolerance, etc.)
- `order_index` (integer)

### Lesson
- `id` (UUID, primary key)
- `module_id` (UUID, foreign key to Module)
- `content` (JSONB)
- `xp_reward` (integer)

### UserProgress
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to User)
- `lesson_id` (UUID, foreign key to Lesson)
- `completed` (boolean)
- `score` (integer, nullable)
- Unique constraint on (user_id, lesson_id)

### Streak
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to User, unique)
- `current_streak` (integer)
- `last_completed` (date)

### Admin
- `id` (UUID, primary key)
- `username` (string, unique)
- `password_hash` (string)
- `created_at` (timestamp)

## Admin Authentication

### Default Admin Credentials
After running the seed script:
- **Username**: `admin`
- **Password**: `changeme123`

⚠️ **Important**: Change the admin password in production!

### How It Works

1. Admin logs in via `POST /api/admin/login`
2. Server verifies username and password using bcrypt
3. If valid, sets an HTTP-only cookie (`admin_session`) with the admin ID
4. Middleware protects `/admin/*` routes by checking for the cookie
5. Admin pages can use `getAdminSession()` from `@/lib/auth` to verify authentication

## Database Migrations

### Create a new migration
```bash
npm run db:migrate
# This will prompt for a migration name
```

### Apply migrations
```bash
npm run db:migrate
```

### Push schema changes (development only)
```bash
npm run db:push
```

### Seed the database
```bash
npm run db:seed
```

### Open Prisma Studio (database GUI)
```bash
npm run db:studio
```

## Deployment to Vercel

### Prerequisites
- Vercel account (https://vercel.com)
- Neon PostgreSQL database (already set up)
- GitHub/GitLab/Bitbucket repository

### Deployment Steps

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   - `DATABASE_URL`: Your Neon database connection string
   - `NODE_ENV`: `production`

4. **Configure Build Settings**
   Vercel should auto-detect, but verify:
   - **Build Command**: `npm run build` (or `next build`)
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

5. **Add Prisma Build Step**
   Vercel needs to generate Prisma Client during build. Add this to your `package.json` scripts:
   ```json
   "postinstall": "prisma generate"
   ```
   Or add a build command that includes it:
   ```json
   "build": "prisma generate && next build"
   ```

6. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - First deployment will take longer due to Prisma generation

7. **Run Migrations on Vercel**
   After first deployment, you need to run migrations:
   ```bash
   # Option 1: Use Vercel CLI
   vercel env pull .env.local
   npx prisma migrate deploy
   
   # Option 2: Use Vercel's built-in terminal
   # Go to your project → Settings → Shell
   # Run: npx prisma migrate deploy
   ```

8. **Seed Production Database (Optional)**
   ```bash
   # Using Vercel CLI or terminal
   DATABASE_URL=your-production-url npx prisma db seed
   ```

9. **Verify Deployment**
   - Check your app: `https://your-project.vercel.app`
   - Test API: `https://your-project.vercel.app/api/users/anonymous`
   - Test health: `https://your-project.vercel.app/api/modules`

### Vercel Configuration Tips

- **Edge Runtime**: API routes run on Node.js runtime by default (good for Prisma)
- **Serverless Functions**: Each API route is a serverless function
- **Environment Variables**: Set in Vercel dashboard → Settings → Environment Variables
- **Database Connections**: Neon works great with Vercel's serverless functions

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Create and run migrations
npm run db:push          # Push schema changes (dev only)
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Production
npm run build            # Build for production
npm start                # Start production server
```

### Code Structure

- **API Routes**: Located in `src/app/api/` using Next.js App Router
- **Database**: Prisma ORM with PostgreSQL
- **Authentication**: Cookie-based sessions for admin
- **Middleware**: Protects `/admin/*` routes

## Security Notes

- Anonymous users (no authentication required)
- Admin authentication uses bcrypt password hashing
- HTTP-only cookies for session management
- No email or password storage for learners
- No medical data storage
- CORS enabled for Flutter and web clients
- For production, consider:
  - Rate limiting (Vercel Pro plan includes this)
  - Restricting CORS origins to specific domains
  - Using HTTPS only (automatic on Vercel)
  - Changing default admin password

## Troubleshooting

### Prisma Client not found
```bash
npm run db:generate
```

### Database connection errors
- Verify `DATABASE_URL` in `.env` is correct
- Check Neon dashboard for connection string
- Ensure `?sslmode=require` is in the URL

### Migration errors
```bash
# Reset database (development only!)
npx prisma migrate reset

# Or manually fix and push
npx prisma db push
```

### Vercel deployment issues
- Ensure `DATABASE_URL` is set in Vercel environment variables
- Check build logs for Prisma generation errors
- Run migrations after first deployment

## License

[Your License Here]

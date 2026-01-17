# Admin CMS Setup Guide

## Quick Start

### 1. Seed the Database (One Time)

Run this command to create the admin user and course:

```bash
npm run seed:cms
```

Or use the API endpoint:

```bash
curl -X POST http://localhost:3000/api/admin/seed
```

This creates:
- **Admin User**: `admin@dewbloom.dev` / `ChangeMe123!`
- **Course**: `dewbloom-dbt` (DewBloom — DBT Skills)

### 2. Start the Dev Server

```bash
npm run dev
```

### 3. Login to Admin CMS

1. Go to: http://localhost:3000/admin-cms/login
2. Enter:
   - **Email**: `admin@dewbloom.dev`
   - **Password**: `ChangeMe123!`

### 4. Start Creating Content!

Once logged in, you'll see the 3-column admin interface:
- **Left**: Module list (drag to reorder)
- **Center**: TipTap editor
- **Right**: Live preview

## Troubleshooting

### "Login failed" error

1. Make sure you ran the seed: `npm run seed:cms`
2. Restart your dev server: Stop (Ctrl+C) and run `npm run dev` again
3. Check that the admin user exists in the database

### "Seed already completed" error

This means the admin user already exists. You can:
- Use the existing credentials: `admin@dewbloom.dev` / `ChangeMe123!`
- Or manually check the database with: `npm run db:studio`

### API route errors

If you get Prisma errors, regenerate the client:
```bash
npm run db:generate
```
Then restart the dev server.

## Available Commands

- `npm run seed:cms` - Seed admin user and course
- `npm run db:generate` - Regenerate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Credentials

**Admin Login:**
- Email: `admin@dewbloom.dev`
- Password: `ChangeMe123!`

⚠️ **Important**: Change the password in production!

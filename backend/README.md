# Dewbloom Backend API

Production-ready FastAPI backend for the Dewbloom educational gamified app.

## Tech Stack

- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy 2.0
- **Migrations**: Alembic
- **Environment**: Python 3.11+

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── users.py        # User endpoints
│   │       ├── modules.py      # Module endpoints
│   │       └── progress.py     # Progress endpoints
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py           # Configuration settings
│   ├── db/
│   │   ├── __init__.py
│   │   └── database.py         # Database connection & session
│   └── models/
│       ├── __init__.py
│       ├── user.py             # User model
│       ├── module.py           # Module model
│       ├── lesson.py           # Lesson model
│       ├── user_progress.py    # UserProgress model
│       └── streak.py           # Streak model
├── alembic/                    # Migration scripts
│   ├── versions/
│   ├── env.py
│   └── script.py.mako
├── alembic.ini                 # Alembic configuration
├── requirements.txt            # Python dependencies
├── render.yaml                 # Render deployment config
├── .env.example                # Example environment variables
└── README.md                   # This file
```

## Local Setup

### Prerequisites

- Python 3.11 or higher
- PostgreSQL 12 or higher
- pip (Python package manager)

### Installation Steps

1. **Clone the repository and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Neon PostgreSQL database**
   - Create a free account at https://neon.tech
   - Create a new project and database
   - Copy your connection string from the Neon dashboard
   - Convert it from `postgresql://` to `postgresql+psycopg://` format
   - Example: `postgresql+psycopg://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

5. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and paste your Neon `DATABASE_URL`:
   ```
   DATABASE_URL=postgresql+psycopg://user:password@host/database?sslmode=require
   ```

6. **Run database migrations**
   ```bash
   alembic upgrade head
   ```

7. **Start the development server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

8. **Verify the API is running**
   - Open http://localhost:8000 in your browser
   - Check health endpoint: http://localhost:8000/health
   - View API docs: http://localhost:8000/docs

## API Endpoints

### Base URL
- Local: `http://localhost:8000/api/v1`
- Production: `https://your-domain.com/api/v1`

### Endpoints

#### Users
- `POST /users/anonymous` - Create a new anonymous user
  - Response: `{ "id": "uuid", "created_at": "iso-timestamp" }`

#### Modules
- `GET /modules` - Get all modules (ordered by order_index)
  - Response: Array of module objects
- `GET /modules/{module_id}/lessons` - Get all lessons for a module
  - Response: Array of lesson objects

#### Progress
- `POST /progress/complete` - Mark a lesson as completed
  - Request Body:
    ```json
    {
      "user_id": "uuid",
      "lesson_id": "uuid",
      "score": 85  // optional
    }
    ```
  - Response: Progress object with `xp_earned`
- `GET /progress/{user_id}` - Get all progress for a user
  - Response: Array of progress objects

## Database Models

### User
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

## Database Migrations

### Create a new migration
```bash
alembic revision --autogenerate -m "description of changes"
```

### Apply migrations
```bash
alembic upgrade head
```

### Rollback migration
```bash
alembic downgrade -1
```

## Deployment to Render

### Prerequisites
- Render account (https://render.com)
- Neon PostgreSQL database (https://neon.tech) - already set up

### Deployment Steps

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Prepare your Neon database URL**
   - Get your connection string from Neon dashboard
   - Convert from `postgresql://` to `postgresql+psycopg://` format
   - Example: `postgresql+psycopg://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

3. **Create a new Web Service on Render**
   - Connect your repository
   - Select the `backend` directory as the root directory
   - Build Command: `pip install -r requirements.txt && alembic upgrade head`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Environment Variables:
     - `DATABASE_URL`: Your Neon database URL (in `postgresql+psycopg://` format)
     - `PROJECT_NAME`: `Dewbloom API`
     - `API_V1_PREFIX`: `/api/v1`
     - `CORS_ORIGINS`: `*` (or specific origins like `https://yourwebsite.com,http://localhost:3000`)

4. **Alternative: Use render.yaml**
   - Render will automatically detect `render.yaml` in your repository
   - Follow the prompts to create services from the YAML file
   - Update the `DATABASE_URL` environment variable with your Neon database URL

5. **Verify deployment**
   - Check the health endpoint: `https://your-service.onrender.com/health`
   - View API docs: `https://your-service.onrender.com/docs`

### Environment Variables for Production

Make sure to set these in Render:
- `DATABASE_URL`: Your Neon database URL (must use `postgresql+psycopg://` format with `?sslmode=require`)
- `CORS_ORIGINS`: Comma-separated list of allowed origins (e.g., `https://your-frontend.com,http://localhost:3000`)

## Development

### Running Tests
```bash
# Add pytest to requirements.txt for testing
pytest
```

### Code Formatting
```bash
# Recommended: Use black and isort
black app/
isort app/
```

### Type Checking
```bash
# Recommended: Use mypy
mypy app/
```

## Security Notes

- This API uses anonymous users (no authentication)
- No email or password storage
- No medical data storage
- CORS is configured for Flutter and web clients
- For production, consider:
  - Rate limiting
  - API key authentication (if needed)
  - Restricting CORS origins to specific domains
  - Using HTTPS only

## License

[Your License Here]

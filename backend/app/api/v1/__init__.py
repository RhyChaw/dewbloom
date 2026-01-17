from fastapi import APIRouter
from app.api.v1 import users, modules, progress

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(modules.router, prefix="/modules", tags=["modules"])
api_router.include_router(progress.router, prefix="/progress", tags=["progress"])

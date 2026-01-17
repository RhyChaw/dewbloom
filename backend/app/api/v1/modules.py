from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.module import Module
from app.models.lesson import Lesson
from pydantic import BaseModel
from uuid import UUID
from typing import List, Dict, Any

router = APIRouter()


class ModuleResponse(BaseModel):
    id: UUID
    title: str
    skill_type: str
    order_index: int

    class Config:
        from_attributes = True


class LessonResponse(BaseModel):
    id: UUID
    module_id: UUID
    content: Dict[str, Any]
    xp_reward: int

    class Config:
        from_attributes = True


@router.get("", response_model=List[ModuleResponse])
def get_modules(db: Session = Depends(get_db)):
    """Get all modules ordered by order_index"""
    modules = db.query(Module).order_by(Module.order_index).all()
    return modules


@router.get("/{module_id}/lessons", response_model=List[LessonResponse])
def get_module_lessons(module_id: UUID, db: Session = Depends(get_db)):
    """Get all lessons for a specific module"""
    # Verify module exists
    module = db.query(Module).filter(Module.id == module_id).first()
    if not module:
        raise HTTPException(status_code=404, detail="Module not found")
    
    lessons = db.query(Lesson).filter(Lesson.module_id == module_id).all()
    return lessons

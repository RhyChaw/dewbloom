from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user_progress import UserProgress
from app.models.user import User
from app.models.lesson import Lesson
from app.models.streak import Streak
from pydantic import BaseModel
from uuid import UUID
from typing import List, Optional
from datetime import date

router = APIRouter()


class CompleteProgressRequest(BaseModel):
    user_id: UUID
    lesson_id: UUID
    score: Optional[int] = None


class CompleteProgressResponse(BaseModel):
    user_id: UUID
    lesson_id: UUID
    completed: bool
    score: Optional[int] = None
    xp_earned: int

    class Config:
        from_attributes = True


class UserProgressResponse(BaseModel):
    user_id: UUID
    lesson_id: UUID
    completed: bool
    score: Optional[int] = None

    class Config:
        from_attributes = True


@router.post("/complete", response_model=CompleteProgressResponse)
def complete_progress(request: CompleteProgressRequest, db: Session = Depends(get_db)):
    """Mark a lesson as completed for a user and update streak"""
    # Verify user exists
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Verify lesson exists
    lesson = db.query(Lesson).filter(Lesson.id == request.lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    # Get or create progress record
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == request.user_id,
        UserProgress.lesson_id == request.lesson_id
    ).first()
    
    if progress:
        # Update existing progress
        progress.completed = True
        if request.score is not None:
            progress.score = request.score
    else:
        # Create new progress
        progress = UserProgress(
            user_id=request.user_id,
            lesson_id=request.lesson_id,
            completed=True,
            score=request.score
        )
        db.add(progress)
    
    # Update streak
    streak = db.query(Streak).filter(Streak.user_id == request.user_id).first()
    today = date.today()
    
    if streak:
        if streak.last_completed:
            days_diff = (today - streak.last_completed).days
            if days_diff == 0:
                # Already completed today, don't update streak
                pass
            elif days_diff == 1:
                # Consecutive day, increment streak
                streak.current_streak += 1
                streak.last_completed = today
            else:
                # Streak broken, reset to 1
                streak.current_streak = 1
                streak.last_completed = today
        else:
            # First completion
            streak.current_streak = 1
            streak.last_completed = today
    else:
        # Create new streak
        streak = Streak(
            user_id=request.user_id,
            current_streak=1,
            last_completed=today
        )
        db.add(streak)
    
    db.commit()
    db.refresh(progress)
    
    return CompleteProgressResponse(
        user_id=progress.user_id,
        lesson_id=progress.lesson_id,
        completed=progress.completed,
        score=progress.score,
        xp_earned=lesson.xp_reward
    )


@router.get("/{user_id}", response_model=List[UserProgressResponse])
def get_user_progress(user_id: UUID, db: Session = Depends(get_db)):
    """Get all progress for a specific user"""
    # Verify user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    progress_list = db.query(UserProgress).filter(UserProgress.user_id == user_id).all()
    return progress_list

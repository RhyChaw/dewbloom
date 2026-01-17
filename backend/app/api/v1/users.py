from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user import User
from pydantic import BaseModel
from uuid import UUID

router = APIRouter()


class AnonymousUserResponse(BaseModel):
    id: UUID
    created_at: str

    class Config:
        from_attributes = True


@router.post("/anonymous", response_model=AnonymousUserResponse, status_code=201)
def create_anonymous_user(db: Session = Depends(get_db)):
    """Create a new anonymous user"""
    user = User()
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return AnonymousUserResponse(
        id=user.id,
        created_at=user.created_at.isoformat()
    )

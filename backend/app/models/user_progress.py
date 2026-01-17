from sqlalchemy import Column, Boolean, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid


class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    lesson_id = Column(UUID(as_uuid=True), ForeignKey("lessons.id"), nullable=False)
    completed = Column(Boolean, nullable=False, default=False)
    score = Column(Integer, nullable=True)

    # Ensure one progress record per user per lesson
    __table_args__ = (UniqueConstraint("user_id", "lesson_id", name="unique_user_lesson"),)

from sqlalchemy import Column, Integer, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.db.database import Base
import uuid


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    module_id = Column(UUID(as_uuid=True), ForeignKey("modules.id"), nullable=False)
    content = Column(JSONB, nullable=False)
    xp_reward = Column(Integer, nullable=False, default=0)

    # Relationship
    module = relationship("Module", backref="lessons")

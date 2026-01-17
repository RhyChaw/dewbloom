from sqlalchemy import Column, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.db.database import Base
import uuid


class Module(Base):
    __tablename__ = "modules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, nullable=False)
    skill_type = Column(String, nullable=False)  # mindfulness, distress_tolerance, etc.
    order_index = Column(Integer, nullable=False)

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from api.db import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True, nullable=False, unique=True)
    title = Column(String(1024), nullable=False)

    done = relationship("Done", back_populates="task", cascade="delete")


class Done(Base):
    __tablename__ = "dones"

    id = Column(
        Integer,
        ForeignKey("tasks.id"),
        primary_key=True,
        index=True,
        nullable=False,
        unique=True,
    )

    task = relationship("Task", back_populates="done")

from typing import Optional

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    title: Optional[str] = Field(None, exsample="Tack Example")


class TaskCreate(TaskBase):
    pass


class TaskCreateResponse(TaskCreate):
    id: int

    class Config:
        from_attributes = True


class Task(TaskBase):
    id: int
    done: bool = Field(
        False, example=False, description="whether the task is done or not"
    )

    class Config:
        from_attributes = True

from pydantic import BaseModel, UUID4
from datetime import datetime
from typing import Optional


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    priority: str = "low"
    category: Optional[str] = None
    status: str = "pending"


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None
    priority: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None


class Task(TaskBase):
    userId: str
    taskId: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True


# NOTE: description, deadline, priority, category_id, および status はオプショナルとして設定されています。これは、null=True やデフォルト値が設定されている属性を反映するためです。
# NOTE: Task に userId, taskId, createdAt, および updatedAt を追加しました。
# NOTE: category_id はモデルの category に対応しています。スキーマでの命名規則が異なる場合、名称を調整する必要があります。
# NOTE: 各属性の型は上記のモデル定義に基づいて選択されています。必要に応じて調整してください。

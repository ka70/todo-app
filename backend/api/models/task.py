from api.db import BaseModel
from pynamodb.attributes import UnicodeAttribute, NumberAttribute


class TaskModel(BaseModel):
    class Meta(BaseModel.Meta):  # Metaクラスを再定義せず、BaseModelのMetaクラスを継承するため
        table_name = "tasks"

    userId = UnicodeAttribute(hash_key=True)
    taskId = UnicodeAttribute(range_key=True)
    title = UnicodeAttribute()
    description = UnicodeAttribute(null=True, default=None)
    status = UnicodeAttribute(default="pending")  # Removed choices
    priority = UnicodeAttribute(default="medium")  # Removed choices
    category = UnicodeAttribute(null=True)
    dueDate = NumberAttribute(null=True, default=None)
    createdAt = NumberAttribute()
    updatedAt = NumberAttribute()

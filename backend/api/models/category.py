# api/models/category.py

from api.db import BaseModel
from pynamodb.attributes import UnicodeAttribute


class Category(BaseModel):
    class Meta:
        table_name = "categories"

    id = UnicodeAttribute(hash_key=True)
    name = UnicodeAttribute()

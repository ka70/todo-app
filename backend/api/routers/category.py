from fastapi import APIRouter, HTTPException
from typing import List

from api.schemas.category import Category, CategoryCreate

router = APIRouter()


@router.get("/categories", response_model=List[Category])
async def list_categories() -> List[Category]:
    return [Category(id=1, name="サンプルカテゴリー")]


@router.post("/categories", response_model=Category)
async def create_category(category: CategoryCreate) -> Category:
    # サンプルの返り値
    return Category(id=2, name=category.name)


@router.get("/categories/{category_id}", response_model=Category)
async def get_category(category_id: int) -> Category:
    # サンプルの返り値
    return Category(id=category_id, name="指定したIDのカテゴリー")


@router.put("/categories/{category_id}", response_model=Category)
async def update_category(category_id: int, category: CategoryCreate) -> Category:
    # サンプルの返り値
    return Category(id=category_id, name=category.name)


@router.delete("/categories/{category_id}", response_model=Category)
async def delete_category(category_id: int) -> None:
    # 削除したとするサンプルのカテゴリーを返す
    return Category(id=category_id, name="削除されたカテゴリー")

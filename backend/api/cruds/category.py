from api.models.category import Category


def create_category(data: dict) -> Category:
    """Create a new category"""
    category = Category(**data)
    category.save()
    return category


def get_category(category_id: str) -> Category:
    """Retrieve a category by ID"""
    try:
        return Category.get(category_id)
    except Category.DoesNotExist:
        return None


def update_category(category_id: str, data: dict) -> Category:
    """Update a category"""
    category = get_category(category_id)
    if category:
        for key, value in data.items():
            setattr(category, key, value)
        category.save()
        return category
    return None


def delete_category(category_id: str) -> None:
    """Delete a category"""
    category = get_category(category_id)
    if category:
        category.delete()

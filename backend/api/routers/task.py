from fastapi import APIRouter, HTTPException, Depends
from typing import List

from api.schemas.task import Task, TaskCreate, TaskUpdate
from api.cruds import task as task_crud
from api.auth import get_current_user

router = APIRouter()


@router.get("/tasks", response_model=List[Task])
async def list_tasks(current_user: str = Depends(get_current_user)) -> List[Task]:
    """Retrieve a list of all tasks"""
    tasks = task_crud.list_tasks(current_user)
    return tasks


@router.post("/tasks", response_model=Task)
async def create_task(
    task: TaskCreate, current_user: str = Depends(get_current_user)
) -> Task:
    """Create a new task"""
    created_task = task_crud.create_task(current_user, task)
    if not created_task:
        raise HTTPException(status_code=400, detail="Task creation failed")
    return created_task


@router.delete("/tasks")
async def delete_task(current_user: str = Depends(get_current_user)):
    """Delete all tasks by user ID"""
    is_deleted = task_crud.delete_all_tasks(current_user)
    if not is_deleted:
        raise HTTPException(status_code=404, detail="ALL tasks deletion failed")
    return {"status": "All tasks deleted successfully"}


@router.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: str, current_user: str = Depends(get_current_user)) -> Task:
    """Retrieve a task by its ID"""
    task = task_crud.get_task(current_user, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/tasks/{task_id}", response_model=Task)
async def update_task(
    task_id: str, task: TaskUpdate, current_user: str = Depends(get_current_user)
) -> Task:
    """Update an existing task"""
    updated_task = task_crud.update_task(current_user, task_id, task)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found or update failed")
    return updated_task


@router.delete("/tasks/{task_id}")
async def delete_task(task_id: str, current_user: str = Depends(get_current_user)):
    """Delete a task by its ID"""
    is_deleted = task_crud.delete_task(current_user, task_id)
    if not is_deleted:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"status": "Task deleted successfully"}

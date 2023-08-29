from api.models.task import TaskModel
from api.schemas.task import Task, TaskCreate, TaskUpdate
from uuid import uuid4
from datetime import datetime


# CREATE
def create_task(user_id: str, data: TaskCreate) -> Task:
    """Create a new task."""
    userId = user_id
    taskId = str(uuid4())
    current_timestamp = datetime.now()

    task = TaskModel(
        userId=userId,
        taskId=taskId,
        title=data.title,
        description=data.description or "",
        dueDate=int(data.deadline.timestamp()) if data.deadline else None,
        priority=data.priority,
        category=data.category,
        createdAt=int(current_timestamp.timestamp()),
        updatedAt=int(current_timestamp.timestamp()),
        status=data.status,
    )
    task.save()
    return convert_to_schema(task)


# READ
def list_tasks(user_id: str) -> list[Task]:
    """Retrieve a list of all tasks."""
    # フィルタ条件を適用してscanを行う
    tasks = TaskModel.scan(TaskModel.userId == user_id)
    return [convert_to_schema(task) for task in tasks]


def get_task(user_id: str, task_id: str) -> Task:
    """Retrieve a task by user ID and task ID."""
    try:
        task = TaskModel.get(user_id, task_id)
        return convert_to_schema(task)
    except TaskModel.DoesNotExist:
        return None


# UPDATE
def update_task(user_id: str, task_id: str, data: TaskUpdate) -> Task:
    """Update an existing task by user ID and task ID."""
    try:
        task = TaskModel.get(user_id, task_id)

        # 更新式を構築するためのactionsリストを作成
        actions = []

        if data.title is not None:
            actions.append(TaskModel.title.set(data.title))

        if data.description is not None:
            actions.append(TaskModel.description.set(data.description))

        if data.deadline is not None:
            actions.append(TaskModel.dueDate.set(int(data.deadline.timestamp())))

        if data.priority is not None:
            actions.append(TaskModel.priority.set(data.priority))

        if data.category is not None:
            actions.append(TaskModel.category.set(data.category))

        if data.status is not None:
            actions.append(TaskModel.status.set(data.status))

        # updatedAtを現在のタイムスタンプで更新
        current_timestamp = datetime.now()
        actions.append(TaskModel.updatedAt.set(int(current_timestamp.timestamp())))

        # 更新式を適用
        task.update(actions=actions)

        return convert_to_schema(task)
    except TaskModel.DoesNotExist:
        return None


# DELETE
def delete_task(user_id: str, task_id: str) -> bool:
    """Delete a task by user ID and task ID."""
    try:
        task = TaskModel.get(user_id, task_id)
        task.delete()
        return True
    except TaskModel.DoesNotExist:
        return None


def delete_all_tasks(user_id: str) -> bool:
    """Delete all tasks by a specific user ID."""
    try:
        tasks = TaskModel.query(user_id)
        for task in tasks:
            task.delete()
        return True
    except Exception as e:
        print(f"An error occurred: {e}")
        return False


# UTILITY
def convert_to_schema(task: TaskModel) -> Task:
    """Convert a TaskModel instance to a Pydantic Task schema."""
    return Task(
        userId=task.userId,
        taskId=task.taskId,
        title=task.title,
        description=task.description,
        deadline=datetime.fromtimestamp(task.dueDate) if task.dueDate else None,
        priority=task.priority,
        category=task.category,
        status=task.status,
        createdAt=datetime.fromtimestamp(task.createdAt),
        updatedAt=datetime.fromtimestamp(task.updatedAt),
    )

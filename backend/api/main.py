from fastapi import FastAPI
from api.routers import category, task

app = FastAPI()


app.include_router(task.router)
app.include_router(category.router)

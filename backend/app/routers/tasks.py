from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from .. import crud, models, schemas, database
from .auth import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task: schemas.TaskCreate, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Create a new task.
    """
    return crud.create_task(db=db, task=task, user_id=current_user.id)

@router.get("/", response_model=List[schemas.TaskResponse])
def read_tasks(
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[models.TaskStatus] = Query(None, description="Filter by status"),
    priority: Optional[models.TaskPriority] = Query(None, description="Filter by priority"),
    search: Optional[str] = Query(None, description="Case-insensitive search by title"),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Get all tasks for the current user. Allows filtering and searching.
    """
    tasks = crud.get_tasks(db, user_id=current_user.id, skip=skip, limit=limit, status=status, priority=priority, search=search)
    return tasks

@router.get("/{task_id}", response_model=schemas.TaskResponse)
def read_task(
    task_id: int, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Get a specific task by ID.
    """
    db_task = crud.get_task(db, task_id=task_id, user_id=current_user.id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(
    task_id: int, 
    task: schemas.TaskUpdate, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Update a task.
    """
    db_task = crud.update_task(db, task_id=task_id, task=task, user_id=current_user.id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int, 
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Delete a task.
    """
    db_task = crud.delete_task(db, task_id=task_id, user_id=current_user.id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return None

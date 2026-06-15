from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from datetime import datetime, timezone
from .models import TaskStatus, TaskPriority

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr = Field(..., examples=["user@example.com"])
    password: str = Field(..., min_length=6, examples=["secret123"])

class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Task Schemas
class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, description="Task title cannot be empty", examples=["Buy groceries"])
    description: Optional[str] = Field(None, examples=["Milk, Bread, Eggs"])
    status: TaskStatus = Field(default=TaskStatus.PENDING, examples=["Pending"])
    priority: TaskPriority = Field(default=TaskPriority.MEDIUM, examples=["Medium"])
    due_date: Optional[datetime] = Field(None, examples=["2026-12-31T23:59:59Z"])

    @field_validator('due_date')
    @classmethod
    def check_due_date(cls, v):
        if v is not None:
            # Simple check based on current UTC time
            now = datetime.now(timezone.utc)
            if v.tzinfo is None:
                v = v.replace(tzinfo=timezone.utc)
            if v < now:
                raise ValueError("Due date cannot be earlier than current date/time")
        return v

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, examples=["Update grocery list"])
    description: Optional[str] = Field(None, examples=["Add apples"])
    status: Optional[TaskStatus] = Field(None, examples=["In Progress"])
    priority: Optional[TaskPriority] = Field(None, examples=["High"])
    due_date: Optional[datetime] = Field(None, examples=["2026-12-31T23:59:59Z"])

    @field_validator('due_date')
    @classmethod
    def check_due_date(cls, v):
        if v is not None:
            now = datetime.now(timezone.utc)
            if v.tzinfo is None:
                v = v.replace(tzinfo=timezone.utc)
            if v < now:
                raise ValueError("Due date cannot be earlier than current date/time")
        return v

class TaskResponse(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime
    owner_id: int

    class Config:
        from_attributes = True

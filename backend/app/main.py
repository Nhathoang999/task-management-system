from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, SessionLocal
from .routers import auth, tasks
from . import crud, schemas

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Management API",
    description="API for managing tasks, users, and authentication.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])

# Seed user on startup
@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        user = crud.get_user_by_email(db, email="admin@test.com")
        if not user:
            user_in = schemas.UserCreate(email="admin@test.com", password="Admin123!")
            crud.create_user(db, user_in)
    finally:
        db.close()

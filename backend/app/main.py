from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import crud, models, schemas
from .database import SessionLocal, engine
from .auth import get_current_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ruta del FrontEND
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

@app.get("/")
def read_root():
    return {"message": "Bienvenido a la base de datos de FastAPI!"}

@app.post("/register/", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.post("/login/")
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful"}

@app.get("/users/", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user(db=db, db_user=db_user, user=user)

@app.delete("/users/{user_id}", response_model=schemas.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    deleted_user = crud.delete_user(db=db, user_id=user_id)
    if deleted_user:
        return deleted_user
    else:
        raise HTTPException(status_code=500, detail="Failed to delete user")

@app.post("/books/", response_model=schemas.Book)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    return crud.create_book(db=db, book=book, user_id=current_user.id)

@app.get("/books/", response_model=list[schemas.Book])
def read_books(skip: int = 0, limit: int = 10, db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    print("Received request to /books/")
    books = crud.get_books(db, user_id=current_user.id, skip=skip, limit=limit)
    return books

@app.put("/books/{book_id}", response_model=schemas.Book)
def update_book(book_id: int, book: schemas.BookUpdate, db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    updated_book = crud.update_book(db=db, book_id=book_id, book=book, user_id=current_user.id)
    if updated_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated_book

@app.delete("/books/{book_id}", response_model=schemas.Book)
def delete_book(book_id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(get_current_user)):
    deleted_book = crud.delete_book(db=db, book_id=book_id, user_id=current_user.id)
    if deleted_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return deleted_book

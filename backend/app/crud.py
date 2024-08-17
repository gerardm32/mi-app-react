from sqlalchemy.orm import Session
from passlib.context import CryptContext
from . import models, schemas

# configuración del contexto de la contraseña con pbkdf2_sha256
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def get_password_hash(password: str) -> str:
    """genera un hash para la contraseña usando pbkdf2_sha256."""
    return pwd_context.hash(password)

def create_user(db: Session, user: schemas.UserCreate):
    """crea un nuevo usuario en la base de datos."""
    db_user = models.User(
        username=user.username,
        email=user.email,
        password=get_password_hash(user.password)  # hashear la contraseña
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    """obtiene el usuario por email."""
    return db.query(models.User).filter(models.User.email == email).first()

def get_user(db: Session, user_id: int):
    """obtiene el  usuario por ID."""
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 10):
    """obtiene una lista de usuarios con paginación."""
    return db.query(models.User).offset(skip).limit(limit).all()

def update_user(db: Session, db_user: models.User, user: schemas.UserCreate):
    """actualiza un usuario existente en la base de datos."""
    db_user.username = user.username
    db_user.email = user.email
    db_user.password = get_password_hash(user.password)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    """elimina un usuario de la base de datos por el ID."""
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return db_user
    return None

# CRUD para libros
def create_book(db: Session, book: schemas.BookCreate, user_id: int):
    """crea un libro en la base de datos."""
    db_book = models.Book(**book.dict(), owner_id=user_id)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_books(db: Session, user_id: int, skip: int = 0, limit: int = 10):
    """obtiene una lista de libros del usuario con paginación."""
    return db.query(models.Book).filter(models.Book.owner_id == user_id).offset(skip).limit(limit).all()

def update_book(db: Session, book_id: int, book: schemas.BookUpdate, user_id: int):
    """actualiza un libro existente en la base de datos."""
    db_book = db.query(models.Book).filter(models.Book.id == book_id, models.Book.owner_id == user_id).first()
    if db_book:
        for key, value in book.dict().items():
            setattr(db_book, key, value)
        db.commit()
        db.refresh(db_book)
        return db_book
    return None

def delete_book(db: Session, book_id: int, user_id: int):
    """borra un libro de la base de datos por el ID."""
    db_book = db.query(models.Book).filter(models.Book.id == book_id, models.Book.owner_id == user_id).first()
    if db_book:
        db.delete(db_book)
        db.commit()
    return db_book

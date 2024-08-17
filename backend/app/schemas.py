from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True 

class BookBase(BaseModel):
    title: str
    author: str

class BookCreate(BookBase):
    pass

class BookUpdate(BaseModel):
    title: str
    author: str

class Book(BookBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True  

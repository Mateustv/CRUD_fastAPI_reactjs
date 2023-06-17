from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from database import engine, Base, sessionLocal
from models import Users
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


class UserSchema(BaseModel):
    name: str
    email: str

    class Config:
        orm_mode = True


class UserCreate(UserSchema):
    password: str


@app.get("/users", response_model=List[UserSchema])
def get_users(db: Session = Depends(get_db)):
    users = db.query(Users).all()
    return users


@app.post("/users", response_model=UserSchema)
def post_users(user: UserCreate, db: Session = Depends(get_db)):
    u = Users(name=user.name, email=user.email, passaword=user.password)
    db.add(u)
    db.commit()
    return u


@app.put("/users/{id}", response_model=UserSchema)
def put_users(id: int, user: UserSchema, db: Session = Depends(get_db)):
    u = db.query(Users).filter(Users.id == id).first()
    u.name = user.name
    u.email = user.email
    db.commit()
    return u


@app.delete("/users/{id}")
def delete_users(id: int, db: Session = Depends(get_db)):
    try:
        u = db.query(Users).filter(Users.id == id).first()
        db.delete(u)
        db.commit()
    except:
        return HTTPException(status_code=404, detail="Usuário não encontrado!")
    return {"message": "Usuário deletado com sucesso!"}

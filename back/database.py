from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DB_URL = "mysql+pymysql://root:mateus123@localhost:3306/bancodeteste"

engine = create_engine(DB_URL)

Base = declarative_base()

sessionLocal = sessionmaker(autocommit=False, bind=engine)

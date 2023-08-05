from sqlalchemy import create_engine

from api.models.task import Base

DB_URL = "postgresql://username:password@db:5432/dbname"
engine = create_engine(DB_URL, echo=True)


def reset_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


if __name__ == "__main__":
    reset_database()

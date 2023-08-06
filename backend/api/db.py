# api/db.py

from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, NumberAttribute

REGION = "ap-northeast-1"
ENDPOINT_URL = "http://localstack:4566"  # localstackを使用する場合、AWSのエンドポイントURLとは異なります
AWS_ACCESS_KEY_ID = "dummy"
AWS_SECRET_ACCESS_KEY = "dummy"


class BaseModel(Model):
    class Meta:
        aws_access_key_id = AWS_ACCESS_KEY_ID
        aws_secret_access_key = AWS_SECRET_ACCESS_KEY
        region = REGION
        host = ENDPOINT_URL  # localstack等を使用する場合に指定

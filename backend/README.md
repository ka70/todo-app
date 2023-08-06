    poetry init \
        --name demo-app \
        --dependency fastapi \
        --dependency uvicorn[standard]
<br>
ライブラリインストール

    poetry install --no-root
<br>
fastapi起動

    poetry run uvicorn api.main:app --host 0.0.0.0 --reload
<br>
postgres接続

    psql -h db -p 5432 -U username -d dbname

<br>

    poetry add sqlalchemy asyncpg

<br>
https://qiita.com/horiuchie/items/c144de41dd64c1762722
<br>
https://zenn.dev/sh0nk/books/537bb028709ab9

## Dynamodb
[LINK](https://zenn.dev/marumarumeruru/articles/6aeb25bd27063a)
### list tables
```
aws --endpoint-url=http://localstack:4566 dynamodb list-tables
```
### create table
tasks table
```
aws --endpoint-url=http://localstack:4566 dynamodb create-table \
    --table-name tasks \
    --attribute-definitions \
        AttributeName=userId,AttributeType=S \
        AttributeName=taskId,AttributeType=S \
    --key-schema AttributeName=userId,KeyType=HASH AttributeName=task_Id,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

```
categorys table
```
aws --endpoint-url=http://localstack:4566 dynamodb create-table \
    --table-name categories \
    --attribute-definitions \
        AttributeName=userId,AttributeType=S \
        AttributeName=categoryId,AttributeType=S \
    --key-schema AttributeName=userId,KeyType=HASH AttributeName=categoryId,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5


```

### get table info
```
aws --endpoint-url=http://localstack:4566 dynamodb describe-table --table-name tasks
```

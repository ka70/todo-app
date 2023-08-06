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

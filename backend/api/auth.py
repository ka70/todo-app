from fastapi import Depends, HTTPException, status

# from fastapi.security import OAuth2PasswordBearer
from typing import Optional

# ここでトークンURLを指定します（例として、実際のURLを変更する必要があるかもしれません）
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(
    # token: str = Depends(oauth2_scheme)
) -> Optional[str]:
    # トークンをデコードしてユーザーIDや情報を取得
    user_id = "dummy_token"  # この部分はダミー
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )
    return user_id

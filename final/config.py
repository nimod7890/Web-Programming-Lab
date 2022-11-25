import os
from dotenv import load_dotenv

load_dotenv()

db = {
    # 데이터베이스에 접속할 사용자 아이디
    'user': os.environ.get('DB_USER'),
    # 사용자 비밀번호
    'password': os.environ.get('DB_PASSWORD'),
    # 접속할 데이터베이스의 주소
    'host': os.environ.get('DB_URL'),
    # 관계형 데이터베이스는 주로 3306 포트를 통해 연결됨
    'port': 3306,
    # 실제 사용할 데이터베이스 이름
    'database': os.environ.get('DB_NAME')
}

DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"
# 데이터베이스 연결 모듈
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

class DatabaseConnector:
    """MySQL 데이터베이스 연결 관리"""

    def __init__(self):
        self.host = os.getenv('DB_HOST', 'localhost')
        self.port = int(os.getenv('DB_PORT', 3306))
        self.database = os.getenv('DB_NAME', 'saju_db')
        self.user = os.getenv('DB_USER', 'root')
        self.password = os.getenv('DB_PASSWORD', '')
        self.connection = None

    def connect(self):
        """데이터베이스 연결"""
        try:
            if self.connection is None or not self.connection.is_connected():
                self.connection = mysql.connector.connect(
                    host=self.host,
                    port=self.port,
                    database=self.database,
                    user=self.user,
                    password=self.password
                )
                print(f"Connected to MySQL database: {self.database}")
            return self.connection
        except Error as e:
            print(f"Error connecting to MySQL: {e}")
            raise

    def disconnect(self):
        """데이터베이스 연결 종료"""
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("MySQL connection closed")

    def execute_query(self, query, params=None):
        """쿼리 실행 (SELECT)"""
        try:
            connection = self.connect()
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, params or ())
            result = cursor.fetchall()
            cursor.close()
            return result
        except Error as e:
            print(f"Error executing query: {e}")
            raise

    def execute_one(self, query, params=None):
        """단일 행 조회"""
        try:
            connection = self.connect()
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, params or ())
            result = cursor.fetchone()
            cursor.close()
            return result
        except Error as e:
            print(f"Error executing query: {e}")
            raise

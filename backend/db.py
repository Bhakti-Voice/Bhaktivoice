from __future__ import annotations

import os
import sqlite3
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
SCHEMA_PATH = ROOT / "schema.sql"
DATA_DIR = ROOT / "data"
LOCAL_DB = DATA_DIR / "bhakti.db"


def _env(name: str, default: str = "") -> str:
    return (os.environ.get(name) or default).strip()


def turso_configured() -> bool:
    url = _env("TURSO_DATABASE_URL")
    token = _env("TURSO_AUTH_TOKEN")
    return bool(url and token and not url.startswith("file:"))


class Database:
    def execute(self, sql: str, args: list[Any] | tuple[Any, ...] | None = None) -> None:
        raise NotImplementedError

    def fetchall(self, sql: str, args: list[Any] | tuple[Any, ...] | None = None) -> list[dict[str, Any]]:
        raise NotImplementedError

    def fetchone(self, sql: str, args: list[Any] | tuple[Any, ...] | None = None) -> dict[str, Any] | None:
        rows = self.fetchall(sql, args)
        return rows[0] if rows else None

    def init_schema(self) -> None:
        sql = SCHEMA_PATH.read_text(encoding="utf-8")
        statements = [part.strip() for part in sql.split(";") if part.strip()]
        for statement in statements:
            self.execute(statement)


class SqliteDatabase(Database):
    def __init__(self, path: Path) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        self.path = path

    def _connect(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.path)
        conn.row_factory = sqlite3.Row
        return conn

    def execute(self, sql: str, args: list[Any] | tuple[Any, ...] | None = None) -> None:
        conn = self._connect()
        try:
            conn.execute(sql, list(args or []))
            conn.commit()
        finally:
            conn.close()

    def fetchall(self, sql: str, args: list[Any] | tuple[Any, ...] | None = None) -> list[dict[str, Any]]:
        conn = self._connect()
        try:
            rows = conn.execute(sql, list(args or [])).fetchall()
            return [dict(row) for row in rows]
        finally:
            conn.close()


class TursoDatabase(Database):
    def __init__(self, url: str, token: str) -> None:
        try:
            from libsql_client import create_client_sync
        except ImportError as error:
            raise RuntimeError(
                "Install libsql-client to use Turso: pip install -r backend/requirements.txt"
            ) from error
        self.client = create_client_sync(url=url, auth_token=token)

    def execute(self, sql: str, args: list[Any] | tuple[Any, ...] | None = None) -> None:
        self.client.execute(sql, list(args or []))

    def fetchall(self, sql: str, args: list[Any] | tuple[Any, ...] | None = None) -> list[dict[str, Any]]:
        result = self.client.execute(sql, list(args or []))
        columns = list(result.columns or [])
        rows: list[dict[str, Any]] = []
        for row in result.rows:
            item: dict[str, Any] = {}
            for index, column in enumerate(columns):
                item[column] = row[index]
            rows.append(item)
        return rows


_db: Database | None = None


def get_db() -> Database:
    global _db
    if _db is not None:
        return _db
    if turso_configured():
        _db = TursoDatabase(_env("TURSO_DATABASE_URL"), _env("TURSO_AUTH_TOKEN"))
    else:
        _db = SqliteDatabase(LOCAL_DB)
    _db.init_schema()
    return _db

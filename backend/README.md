# Bhakti Voice CMS

FastAPI admin + public JSON API. All editorial content lives in Turso. The Next.js site reads it; nothing is hardcoded.

## Run

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Set in `.env` (or the repo root `.env`):

- `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN`
- `ADMIN_USERNAME` / `ADMIN_PASSWORD`
- `SESSION_SECRET`

Then:

```bash
uvicorn main:app --reload --port 8000
```

Admin login is only here: http://127.0.0.1:8000/admin

The public site never hosts this panel. Publish katha, blogs, yatra, temples, festivals, mantras, store items, and the rest with the forms. Until you save something, every list on the site is empty and every count is 0.

If Turso env vars are missing, a local SQLite file is used at `backend/data/bhakti.db` so you can still try the forms.

Local dummy content (one sample of every kind) is written into that SQLite file the first time the CMS starts empty. It never runs on Vercel and it refuses to write when Turso is configured. Re-seed with:

```bash
npm run seed:local
```

Admin also accepts JSON: open `/admin/json`, paste one object or a list, or upload a `.json` file. Download current rows from **Download all JSON**. For homepage quotes, choose kind **Quotes** (`quotes`) and import an array like `backend/samples/quotes.json`. One published quote is shown on the home banner; it stays the same all day (IST) and changes the next day.


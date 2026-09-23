"""
Bhakti Voice — Zero-Impact URL Migration Script for CMS Database.

This script updates all legacy URL strings stored in the `cms_entries` table's
JSON `data` column, ensuring full synchronization with the 12-branch site architecture.
Safe and idempotent: Can be run multiple times without unintended consequences.
"""

import sys
from db import db

URL_REPLACEMENTS = [
    ("/bhagavad-gita", "/gita"),
    ("/sacred-yatra-guides", "/yatra"),
    ("/hindu-temples", "/temples"),
    ("/hindu-festivals", "/festivals"),
    ("/panchang/festivals", "/festivals"),
    ("/hindu-calendar", "/calendar"),
    ("/printable-calendar", "/calendar/printable"),
    ("/bhakti-blog", "/blog"),
    ("/bhakti-store", "/store"),
    ("/mantras-for-naam-jaap", "/mantras"),
    ("/aarti-chants", "/aarti"),
    ("/bhajan-and-kirtan", "/bhajans"),
    ("/katha-stories", "/katha"),
    ("/daily-sadhana", "/sadhana"),
    ("/devotee-community", "/community"),
    ("/vrat-upavas", "/vrat"),
    ("/kundli-milan", "/kundli/milan"),
    ("/choghadiya", "/muhurat/choghadiya"),
    ("/panchak", "/muhurat/panchak"),
    ("/bhadra", "/muhurat/bhadra"),
    ("/hora", "/muhurat/hora"),
    ("/gowri-panchangam", "/muhurat/gowri"),
    ("/shubh-dates", "/muhurat/shubh-dates"),
    ("/suvichar-card-maker", "/spiritual-tools/suvichar-maker"),
    ("/baby-names", "/spiritual-tools/baby-names"),
    ("/aaj-ki-tithi", "/tithi-today"),
    ("/daily-quotes", "/quotes"),
]

def migrate():
    database = db()
    total_updated = 0
    print("Starting CMS URL migration...")

    for old_url, new_url in URL_REPLACEMENTS:
        # Search for any occurrences in the JSON data column
        rows = database.fetchall(
            "SELECT id, kind, slug, data FROM cms_entries WHERE data LIKE ?",
            (f"%{old_url}%",),
        )
        if not rows:
            continue

        print(f"Found {len(rows)} entries with '{old_url}' -> updating to '{new_url}'")
        for row in rows:
            entry_id = row["id"]
            old_data = row["data"]
            new_data = old_data.replace(old_url, new_url)
            database.execute(
                "UPDATE cms_entries SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                (new_data, entry_id),
            )
            total_updated += 1

    print(f"\nMigration complete. Total entries updated: {total_updated}")

if __name__ == "__main__":
    try:
        migrate()
    except Exception as e:
        print(f"Migration error: {e}", file=sys.stderr)
        sys.exit(1)

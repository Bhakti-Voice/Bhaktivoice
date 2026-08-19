-- Bhakti Voice — Turso schema (users + CMS). Starts empty.

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  firebase_uid TEXT UNIQUE NOT NULL,
  email TEXT,
  name TEXT,
  photo_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jaap_counts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  mantra_slug TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  date TEXT NOT NULL,
  UNIQUE(user_id, mantra_slug, date)
);

CREATE TABLE IF NOT EXISTS jaap_totals (
  mantra_slug TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sankalps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  mantra_slug TEXT,
  target_days INTEGER,
  target_count INTEGER,
  current_count INTEGER DEFAULT 0,
  start_date TEXT,
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS diary_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  jaap_count INTEGER DEFAULT 0,
  mala_count INTEGER DEFAULT 0,
  notes TEXT,
  UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS saved_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  slug TEXT NOT NULL,
  UNIQUE(user_id, type, slug)
);

CREATE TABLE IF NOT EXISTS cms_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'published',
  data TEXT NOT NULL DEFAULT '{}',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(kind, slug)
);

CREATE INDEX IF NOT EXISTS idx_cms_kind_status ON cms_entries(kind, status);
CREATE INDEX IF NOT EXISTS idx_jaap_date ON jaap_counts(date);
CREATE INDEX IF NOT EXISTS idx_jaap_user ON jaap_counts(user_id);

CREATE TABLE IF NOT EXISTS community_members (
  user_id TEXT NOT NULL,
  community_slug TEXT NOT NULL,
  joined_at TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, community_slug)
);

CREATE TABLE IF NOT EXISTS communities (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  created_by TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_communities_owner ON communities(created_by);

CREATE TABLE IF NOT EXISTS community_threads (
  id TEXT PRIMARY KEY,
  community_slug TEXT NOT NULL,
  user_id TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS community_replies (
  id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL,
  community_slug TEXT NOT NULL,
  user_id TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_community_members_slug ON community_members(community_slug);
CREATE INDEX IF NOT EXISTS idx_community_threads_slug_created ON community_threads(community_slug, created_at);
CREATE INDEX IF NOT EXISTS idx_community_replies_thread ON community_replies(thread_id, created_at);

CREATE TABLE IF NOT EXISTS cms_media (
  id TEXT PRIMARY KEY,
  mime TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    body TEXT NOT NULL,
    description VARCHAR(2000),
    title VARCHAR(50) NOT NULL UNIQUE,
    slug TEXT,
    background_color TEXT,
    emoji TEXT,
    created_at DATE,
    updated_at DATE
);
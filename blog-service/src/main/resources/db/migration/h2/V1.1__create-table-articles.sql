CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    author_id INTEGER NOT NULL,
    title VARCHAR(50) NOT NULL UNIQUE,
    body TEXT NOT NULL,
    description VARCHAR(5000),
    slug VARCHAR(60),
    image_url TEXT,
    background_color TEXT DEFAULT '#29e65b',
    font_color TEXT DEFAULT '#000000',
    emoji TEXT,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE
);
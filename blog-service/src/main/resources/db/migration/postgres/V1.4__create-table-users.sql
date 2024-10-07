CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(35) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    bio VARCHAR(5000) DEFAULT 'Hallo Welt, jetzt gerade ich das Dmblog nutze!',
    image_url TEXT,
    background_image_url TEXT,
    background_color TEXT DEFAULT '#29e65b',
    role TEXT NOT NULL DEFAULT 'USER',
    created_at DATE,
    updated_at DATE
);
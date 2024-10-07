CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(35) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    bio VARCHAR(5000) DEFAULT 'Hallo Welt, jetzt gerade ich das Dmblog nutze!',
    image_url TEXT,
    background_image_url TEXT,
    background_color TEXT DEFAULT '#29e65b',
    role TEXT NOT NULL DEFAULT 'USER',
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE
);
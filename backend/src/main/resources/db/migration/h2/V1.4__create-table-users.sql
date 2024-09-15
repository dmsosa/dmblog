CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(35) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    bio VARCHAR(5000),
    image TEXT,
    background_color TEXT,
    role TEXT NOT NULL,
    created_at DATE,
    updated_at DATE
);
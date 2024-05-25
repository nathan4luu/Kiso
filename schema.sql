-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE
);

-- Terms table
CREATE TABLE IF NOT EXISTS terms (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    term VARCHAR(255) NOT NULL,
    definition TEXT NOT NULL
);

-- Flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
    id SERIAL PRIMARY KEY,
    term_id INTEGER REFERENCES terms(id),
    correct BOOLEAN NOT NULL DEFAULT FALSE
);

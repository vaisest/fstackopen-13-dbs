CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, title, url)
VALUES
    ('Dan Abramov', 'Writing Resilient Components', 'https://helsinki.fi'),
    ('Martin Fowler', 'Is High Quality Software Worth the Cost?', 'https://helsinki.fi'),
    ('Robert C. Martin', 'FP vs. OO List Processing', 'https://helsinki.fi');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);
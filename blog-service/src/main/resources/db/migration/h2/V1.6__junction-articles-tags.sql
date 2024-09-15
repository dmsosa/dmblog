CREATE TABLE IF NOT EXISTS cats (
    article_id INTEGER NOT NULL REFERENCES articles(id),
    tag_name TEXT NOT NULL REFERENCES tags(name),
    CONSTRAINT cats_pk PRIMARY KEY (article_id, tag_name)
);
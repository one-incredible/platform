CREATE TABLE file (
    id uuid NOT NULL,
    revision integer,
    PRIMARY KEY (id)
);

CREATE TABLE file_revision (
    id uuid,
    revision integer,
    path text NOT NULL,
    mime varchar,
    size integer,
    PRIMARY KEY (id, revision)
);

ALTER TABLE file
    ADD FOREIGN KEY (id, revision) REFERENCES file_revision (id, revision);

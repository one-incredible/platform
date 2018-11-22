CREATE TABLE resolution (
    id uuid NOT NULL,
    revision integer,
    PRIMARY KEY (id)
);

CREATE TABLE resolution_revision (
    id uuid,
    revision integer,
    width integer,
    height integer,
    PRIMARY KEY (id, revision)
);

ALTER TABLE resolution
    ADD FOREIGN KEY (id, revision) REFERENCES resolution_revision (id, revision);

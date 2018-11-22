CREATE TABLE stream (
    id uuid NOT NULL,
    revision integer,
    PRIMARY KEY (id)
);

CREATE TABLE stream_revision (
    id uuid,
    revision integer,
    resolution_id uuid REFERENCES resolution (id),
    file_id uuid REFERENCES file (id),
    PRIMARY KEY (id, revision)
);

ALTER TABLE stream
    ADD FOREIGN KEY (id, revision) REFERENCES stream_revision (id, revision);

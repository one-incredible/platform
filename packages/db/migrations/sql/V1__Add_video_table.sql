CREATE TABLE video (
    id uuid NOT NULL,
    revision integer,
    PRIMARY KEY (id)
);

CREATE TABLE video_revision (
    id uuid,
    revision integer,
    name text,
    PRIMARY KEY (id, revision)
);

ALTER TABLE video
    ADD FOREIGN KEY (id, revision) REFERENCES video_revision (id, revision);

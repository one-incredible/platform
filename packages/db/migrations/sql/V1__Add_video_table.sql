CREATE TABLE video (
    id uuid NOT NULL,
    revision integer,
    PRIMARY KEY (id)
);

CREATE TABLE video_revision (
    parent uuid,
    revision integer,
    name text,
    PRIMARY KEY (parent, revision)
);

ALTER TABLE video
    ADD FOREIGN KEY (id, revision) REFERENCES video_revision (parent, revision);

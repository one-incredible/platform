CREATE TABLE video (
    id uuid NOT NULL,
    revision_id integer
);

CREATE TABLE video_revision (
    id SERIAL,
    name text
);

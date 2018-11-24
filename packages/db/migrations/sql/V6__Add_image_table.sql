CREATE TABLE image (
    id uuid NOT NULL,
    revision integer,
    PRIMARY KEY (id)
);

CREATE TABLE image_revision (
    id uuid,
    revision integer,
    resolution_id uuid REFERENCES resolution (id),
    file_id uuid REFERENCES file (id),
    PRIMARY KEY (id, revision)
);

ALTER TABLE image
    ADD FOREIGN KEY (id, revision) REFERENCES image_revision (id, revision);

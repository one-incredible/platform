CREATE TABLE stream_revision (
  id uuid NOT NULL,
  revision integer NOT NULL,
  resolution_id uuid REFERENCES resolution (id),
  file_id uuid REFERENCES file (id),
  UNIQUE(id, revision)
);

CREATE TABLE stream (
  id uuid NOT NULL,
  revision integer NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id, revision) REFERENCES stream_revision (id, revision)
);

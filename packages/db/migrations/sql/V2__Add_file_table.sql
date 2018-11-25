CREATE TABLE file_revision (
  id uuid NOT NULL,
  revision integer NOT NULL,
  path text,
  mime text,
  size integer,
  UNIQUE(id, revision)
);

CREATE TABLE file (
  id uuid NOT NULL,
  revision integer NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id, revision) REFERENCES file_revision (id, revision)
);

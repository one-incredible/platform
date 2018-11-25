CREATE TABLE resolution_revision (
  id uuid NOT NULL,
  revision integer NOT NULL,
  width integer,
  height integer,
  UNIQUE(id, revision)
);

CREATE TABLE resolution (
  id uuid NOT NULL,
  revision integer NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id, revision) REFERENCES resolution_revision (id, revision)
);

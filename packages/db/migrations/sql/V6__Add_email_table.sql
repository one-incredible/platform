CREATE TABLE email_revision (
  id uuid NOT NULL,
  revision integer NOT NULL,
  address text,
  verfiedAt timestamptz,
  UNIQUE(id, revision)
);

CREATE TABLE email (
  id uuid NOT NULL,
  revision integer NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id, revision) REFERENCES email_revision (id, revision)
);


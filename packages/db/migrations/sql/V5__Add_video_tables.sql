CREATE TABLE video_revision (
  id uuid NOT NULL,
  revision integer NOT NULL,
  name text,
  UNIQUE(id, revision)
);

CREATE TABLE video (
  id uuid NOT NULL,
  revision integer NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id, revision) REFERENCES video_revision (id, revision)
);

CREATE TABLE video_images (
  video_id uuid NOT NULL REFERENCES video (id),
  image_id uuid NOT NULL REFERENCES image (id),
  PRIMARY KEY (video_id, image_id)
);

CREATE TABLE video_streams (
  video_id uuid NOT NULL REFERENCES video (id),
  stream_id uuid NOT NULL REFERENCES stream (id),
  PRIMARY KEY (video_id, stream_id)
);
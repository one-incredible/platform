CREATE TABLE video_streams (
    video_id uuid NOT NULL REFERENCES video (id),
    stream_id uuid NOT NULL REFERENCES stream (id),
    PRIMARY KEY (video_id, stream_id)
);

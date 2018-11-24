CREATE TABLE video_images (
    video_id uuid NOT NULL REFERENCES video (id),
    image_id uuid NOT NULL REFERENCES image (id),
    PRIMARY KEY (video_id, image_id)
);

class Storage {
    constructor(db) {
        this.db = db;
    }
}

export class VideoStorage extends Storage {
    async store(video) {
        const query = `INSERT INTO video_revision
(
    parent,
    name,
    revision
)
SELECT
    $1,
    $2,
    COALESCE(
        MAX(revision) + 1,
        1
    )
FROM video_revision WHERE parent = $3
RETURNING revision
`;
        return this.db.query(query, [
            video.id,
            video.name,
            video.id,
        ])
        .then(result => {
            const {revision} = result.rows[0];
            const query = ` INSERT INTO video
(
    id,
    revision
)
VALUES
(
    $1,
    $2
)`;
            return this.db.query(query, [
                video.id,
                revision,
            ]);
        });
    }
}

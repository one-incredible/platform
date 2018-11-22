import { Storage } from '../storage';
import { Video } from './model';

const Query = {
  fetchRevision(videoId) {
    return {
      text: `
SELECT
  r.parent AS id,
  r.name
FROM
  video_revision r
JOIN
  video v
  ON
    v.id = r.parent AND
    v.revision = r.revision
WHERE
  v.id = $1
`,
      values: [videoId],
    };
  },

  updateRevision(video, revisionNo) {
    return {
      text: `
INSERT INTO video
(
    id,
    revision
)
VALUES
(
    $1,
    $2
)`,
      values: [video.id, revisionNo],
    };
  },

  storeRevision(video) {
    return {
      text: `
INSERT INTO video_revision
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
FROM
    video_revision
WHERE
    parent = $3
RETURNING
    revision
`,
      values: [video.id, video.name, video.id],
    };
  },
};

export class VideoStorage extends Storage {
  async fetch(videoId) {
    const result = await this.db.query(Query.fetchRevision(videoId));
    if (result.rowCount === 0) {
      return null;
    }

    return Video.decode(result.rows[0]);
  }

  async store(video) {
    try {
      await this.db.query('BEGIN');
      await this.db.query('DELETE FROM video WHERE id = $1', [video.id]);

      const result = await this.db.query(Query.storeRevision(video));

      const { revision } = result.rows[0];

      await this.db.query(Query.updateRevision(video, revision));

      await this.db.query('COMMIT');
    } catch (e) {
      await this.db.query('ROLLBACK');
      throw e;
    }
  }
}

import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

/**
 * Comment table.
 * When a user creates a grid point, they can also leave a comment.
 * Users can also leave comments on existing comments, creating a nested comment tree.
 */
export interface CommentTable {
  id: Generated<number>;
  user_id: number;
  grid_id: number;
  // content of the comment
  text: string;
  // amount of likes and comments this comment has. We could just run a count SQL statement, but it seems more efficient to also keep track here.
  vote_count: number;
  comment_count: number;
  // direct parent id of this comment
  parent_comment_id: number | null;
  top_level_comment_id: number | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, never, string | undefined>;
}

export type Comment = Selectable<CommentTable>;
export type NewComment = Insertable<CommentTable>;
export type CommentUpdate = Updateable<CommentTable>;

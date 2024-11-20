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
  userId: number;
  gridId: number;
  // content of the comment
  text: string;
  // amount of likes and comments this comment has. We could just run a count SQL statement, but it seems more efficient to also keep track here.
  voteCount: number;
  commentCount: number;
  // direct parent id of this comment
  parentCommentId: number | null;
  topLevelCommentId: number | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, never, string | undefined>;
}

export type Comment = Selectable<CommentTable>;
export type NewComment = Insertable<CommentTable>;
export type CommentUpdate = Updateable<CommentTable>;

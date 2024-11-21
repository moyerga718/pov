import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";
import { VoteType } from "./Constants/VoteType";

/**
 * Vote table.
 * Users can upvote or downvote comments. Thats pretty much it, this keeps track of that
 */
export interface VoteTable {
  id: Generated<number>;
  userId: number;
  commentId: number;
  voteType: VoteType;
  // voteType: ColumnType<VoteType, string, string>;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, never, string | undefined>;
}

export type Vote = Selectable<VoteTable>;
export type NewVote = Insertable<VoteTable>;
export type VoteUpdate = Updateable<VoteTable>;

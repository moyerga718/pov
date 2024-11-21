import { CommentTable } from "./Comment/Table";
import { GridTable } from "./Grid/Table";
import { GridPointTable } from "./GridPoint/Table";
import { UserTable } from "./User/Table";
import { VoteTable } from "./Vote/Table";

export interface Database {
  comment: CommentTable;
  grid: GridTable;
  gridPoint: GridPointTable;
  user: UserTable;
  vote: VoteTable;
}

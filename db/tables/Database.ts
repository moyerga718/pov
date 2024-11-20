import { CommentTable } from "./Comment/Table";
import { GridTable } from "./Grid/Table";
import { UserTable } from "./User/Table";

export interface Database {
  comment: CommentTable;
  grid: GridTable;
  user: UserTable;
}

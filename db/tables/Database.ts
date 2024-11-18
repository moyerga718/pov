import { GridTable } from "./Grid/Table";
import { UserTable } from "./User/Table";

export interface Database {
  user: UserTable;
  grid: GridTable;
}

import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

/**
 * Grid table.
 * A grid is an alignment chart that a user can make and other users can plot points on.
 * This will probably end up getting BEEFED up.
 */
export interface GridTable {
  id: Generated<number>;
  title: string;
  northLabel: string;
  eastLabel: string;
  southLabel: string;
  westLabel: string;
  gridPointCount: ColumnType<number, never, number>;
  commentCount: ColumnType<number, never, number>;
  createdByUserId: number;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, never, string | undefined>;
}

export type Grid = Selectable<GridTable>;
export type NewGrid = Insertable<GridTable>;
export type GridUpdate = Updateable<GridTable>;

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
  north_label: string;
  east_label: string;
  south_label: string;
  west_label: string;
  grid_point_count: ColumnType<number, never, number>;
  comment_count: ColumnType<number, never, number>;
  created_by_user_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, never, string | undefined>;
}

export type Grid = Selectable<GridTable>;
export type NewGrid = Insertable<GridTable>;
export type GridUpdate = Updateable<GridTable>;

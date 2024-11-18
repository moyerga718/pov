import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

/**
 * Grid point table.
 * A Grid Point is a a users plotted response on a grid
 * Still need to work out how i'll actually store the data on a grid...
 */
export interface GridPointTable {
  id: Generated<number>;
  grid_id: number;
  user_id: number;
  // x and y values determine where this point falls on the grids axes.
  // both of these should range from -100 to 100.
  x_value: number;
  y_value: number;
  comment_id: number | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, never, string | undefined>;
}

export type GridPoint = Selectable<GridPointTable>;
export type NewGridPoint = Insertable<GridPointTable>;
export type GridPointUpdate = Updateable<GridPointTable>;

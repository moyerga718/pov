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
  gridId: number;
  userId: number;
  // x and y values determine where this point falls on the grids axes.
  // both of these should range from -100 to 100.
  xValue: number;
  yValue: number;
  commentId: number | null;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, never, string | undefined>;
}

export type GridPoint = Selectable<GridPointTable>;
export type NewGridPoint = Insertable<GridPointTable>;
export type GridPointUpdate = Updateable<GridPointTable>;

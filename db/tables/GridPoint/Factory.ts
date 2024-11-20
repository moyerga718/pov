import { faker } from "@faker-js/faker";
import { NewGridPoint } from "./Table";

function createRandomGridPoint(
  userId: number,
  gridId: number,
  commentId: number | null
): NewGridPoint {
  return {
    userId,
    gridId,
    xValue: faker.number.int({ min: -100, max: 100 }),
    yValue: faker.number.int({ min: -100, max: 100 }),
    commentId,
  } as NewGridPoint;
}

export function createRandomGridPoints(
  userId: number,
  gridId: number,
  commentId: number | null,
  numberOfComments: number = 1
): NewGridPoint[] {
  const grids: NewGridPoint[] = [];
  for (let i = 0; i < numberOfComments; i++) {
    grids.push(createRandomGridPoint(userId, gridId, commentId));
  }
  return grids;
}

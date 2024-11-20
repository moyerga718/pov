import { faker } from "@faker-js/faker";
import { NewGrid } from "./Table";

export function createRandomGrid(createdByUserId: number): NewGrid {
  return {
    title: faker.book.title(),
    northLabel: faker.music.genre(),
    eastLabel: faker.animal.cat(),
    southLabel: faker.music.genre(),
    westLabel: faker.animal.cat(),
    commentCount: 0,
    gridPointCount: 0,
    createdByUserId: createdByUserId,
  } as NewGrid;
}

export function createRandomGrids(
  createdByUserId: number,
  numberOfGrids: number
): NewGrid[] {
  const grids: NewGrid[] = [];
  for (let i = 0; i < numberOfGrids; i++) {
    grids.push(createRandomGrid(createdByUserId));
  }
  return grids;
}

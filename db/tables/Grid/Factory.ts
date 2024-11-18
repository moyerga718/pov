import { faker } from "@faker-js/faker";
import { NewGrid } from "./Table";

export function createRandomGrid(createdByUserId: number): NewGrid {
  return {
    title: faker.book.title(),
    north_label: faker.music.genre(),
    east_label: faker.animal.cat(),
    south_label: faker.music.genre(),
    west_label: faker.animal.cat(),
    comment_count: 0,
    created_by_user_id: createdByUserId,
  } as NewGrid;
}

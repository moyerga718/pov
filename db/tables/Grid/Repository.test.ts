import { createRandomUser } from "../User/Factory";
import { createRandomGrid } from "./Factory";
import * as UserRepository from "../User/Repository";
import * as GridRepository from "./Repository";
import { User } from "../User/Table";
import { Grid } from "./Table";

describe("GridRepository", () => {
  const testContext: {
    user: User | undefined;
    grid: Grid | undefined;
    numberOfGrids: number;
  } = {
    user: undefined,
    grid: undefined,
    numberOfGrids: Math.floor(Math.random() * 10) + 1,
  };
  const testUserInput = createRandomUser();

  it("should create a user (to make a grid)", async () => {
    const testUser = await UserRepository.createUser(testUserInput);
    testContext.user = testUser;
  });

  it("should create a grid", async () => {
    expect(testContext.user).toBeDefined();
    if (!testContext.user) {
      console.error("no test user");
      return;
    }
    const testGridInput = createRandomGrid(testContext.user.id);
    const testGrid = await GridRepository.createGrid(testGridInput);
    expect(testGrid).toBeDefined();
    testContext.grid = testGrid;
  });

  it("should find grid by title", async () => {
    expect(testContext.grid).toBeDefined();
    if (!testContext.grid) {
      return;
    }
    const foundGrid = await GridRepository.findGrids(testContext.grid);
    expect(foundGrid[0]).toEqual(testContext.grid);
  });

  it("should find all grids for a user", () => {
    expect(testContext.grid).toBeDefined();
    expect(testContext.user).toBeDefined();
    if (!testContext.grid || !testContext.user) {
      return;
    }
  });

  test.todo("should update grid title");

  test.todo("should increment grid comment count");

  test.todo("should increment grid point count");

  test.todo("should delete grid");

  test.todo("should delete user");
});

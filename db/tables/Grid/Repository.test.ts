import { createRandomUser } from "../User/Factory";
import { createRandomGrid } from "./Factory";
import * as UserRepository from "../User/Repository";
import * as GridRepository from "./Repository";
import { User } from "../User/Table";
import { Grid } from "./Table";

describe("GridRepository", () => {
  const testContext: { user: User | undefined; grid: Grid | undefined } = {
    user: undefined,
    grid: undefined,
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
  });

  test.todo("should find grid by title");

  test.todo("should find all grids for a user");

  test.todo("should update grid title");

  test.todo("should increment grid comment count");

  test.todo("should increment grid point count");

  test.todo("should delete grid");
});

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
  } = {
    user: undefined,
    grid: undefined,
  };
  const testUserInput = createRandomUser();

  /** CREATE  */
  it("should create a user (to make a grid)", async () => {
    const testUser = await UserRepository.createUser(testUserInput);
    expect(testUser).toBeDefined();
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

  /** READ */

  it("should find grid by title", async () => {
    expect(testContext.grid).toBeDefined();
    if (!testContext.grid) {
      return;
    }

    const searchInput: Partial<Grid> = {
      title: testContext.grid.title,
    };
    const foundGrid = await GridRepository.findGrids(searchInput);
    expect(foundGrid[0]).toEqual(testContext.grid);
  });

  it("should find grid by auser", async () => {
    expect(testContext.grid).toBeDefined();
    expect(testContext.user).toBeDefined();
    if (!testContext.grid || !testContext.user) {
      return;
    }
    const foundGrids = await GridRepository.findAllGridsForUser(
      testContext.user.id
    );
    expect(foundGrids[0]);
  });

  test.todo("should find multiple grids for a user");

  /** UPDATE */

  test.todo("should update grid title");

  it("should increment grid comment count", async () => {
    expect(testContext.grid).toBeDefined();
    if (!testContext.grid) {
      return;
    }
    await GridRepository.incrementGridCommentCount(testContext.grid.id);
    const updatedGrid = await GridRepository.findGridById(testContext.grid.id);
    expect(updatedGrid).toBeDefined();
    if (!updatedGrid) {
      console.error("ya didnt get the updated grid idiot");
      return;
    }
    expect(updatedGrid.commentCount).toEqual(testContext.grid.commentCount + 1);
  });

  it("should decrement grid comment count", async () => {
    expect(testContext.grid).toBeDefined();
    if (!testContext.grid) {
      return;
    }

    const currentGridState = await GridRepository.findGridById(
      testContext.grid.id
    );
    expect(currentGridState).toBeDefined();
    if (!currentGridState) {
      return;
    }

    await GridRepository.decrementGridCommentCount(currentGridState.id);

    const updatedGrid = await GridRepository.findGridById(testContext.grid.id);
    expect(updatedGrid).toBeDefined();
    if (!updatedGrid) {
      console.error("ya didnt get the updated grid idiot");
      return;
    }
    expect(updatedGrid.commentCount).toEqual(currentGridState.commentCount - 1);
  });

  it("should increment grid point count", async () => {
    expect(testContext.grid).toBeDefined();
    if (!testContext.grid) {
      return;
    }
    await GridRepository.incrementGridPointCount(testContext.grid.id);
    const updatedGrid = await GridRepository.findGridById(testContext.grid.id);
    expect(updatedGrid).toBeDefined();
    if (!updatedGrid) {
      console.error("ya didnt get the updated grid idiot");
      return;
    }
    expect(updatedGrid.gridPointCount).toEqual(
      testContext.grid.gridPointCount + 1
    );
  });

  it("should decrement grid point count", async () => {
    expect(testContext.grid).toBeDefined();
    if (!testContext.grid) {
      return;
    }

    const currentGridState = await GridRepository.findGridById(
      testContext.grid.id
    );
    expect(currentGridState).toBeDefined();
    if (!currentGridState) {
      return;
    }

    await GridRepository.decrementGridPointCount(currentGridState.id);

    const updatedGrid = await GridRepository.findGridById(testContext.grid.id);
    expect(updatedGrid).toBeDefined();
    if (!updatedGrid) {
      console.error("ya didnt get the updated grid idiot");
      return;
    }
    expect(updatedGrid.gridPointCount).toEqual(
      currentGridState.gridPointCount - 1
    );
  });

  /** DELETE */

  it("should delete grid", async () => {
    expect(testContext.grid).toBeDefined();
    if (!testContext.grid) {
      return;
    }
    await GridRepository.deleteGrid(testContext.grid.id);
    const deletedGrid = await GridRepository.findGridById(testContext.grid.id);
    expect(deletedGrid).toBeUndefined();
  });

  it("should delete user", async () => {
    expect(testContext.user).toBeDefined();
    if (!testContext.user) {
      return;
    }
    await UserRepository.deleteUser(testContext.user.id);
    const deletedUser = await GridRepository.findGridById(testContext.user.id);
    expect(deletedUser).toBeUndefined();
  });
});

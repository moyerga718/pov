import { createRandomUser } from "../User/Factory";
import { createRandomGrid } from "./Factory";
import * as UserRepository from "../User/Repository";
import * as GridRepository from "./Repository";
import { NewUser, User } from "../User/Table";
import { Grid } from "./Table";
import { runInTransaction } from "../../transactions/runInTransaction";

describe("GridRepository", async () => {
  const testContext: {
    user: User | undefined;
    grid: Grid | undefined;
  } = {
    user: undefined,
    grid: undefined,
  };
  const testUserInput: NewUser = await createRandomUser();

  /** CREATE  */
  it("should create a user (to make a grid)", async () => {
    await runInTransaction(async (trx) => {
      const testUser = await UserRepository.createUser(testUserInput, trx);
      expect(testUser).toBeDefined();
      testContext.user = testUser;
    });
  });

  it("should create a grid", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.user).toBeDefined();
      if (!testContext.user) {
        console.error("no test user");
        return;
      }
      const testGridInput = createRandomGrid(testContext.user.id);
      const testGrid = await GridRepository.createGrid(testGridInput, trx);
      expect(testGrid).toBeDefined();
      testContext.grid = testGrid;
    });
  });

  /** READ */

  it("should find grid by title", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.grid).toBeDefined();
      if (!testContext.grid) {
        return;
      }

      const searchInput: Partial<Grid> = {
        title: testContext.grid.title,
      };
      const foundGrid = await GridRepository.findGrids(searchInput, trx);
      expect(foundGrid[0]).toEqual(testContext.grid);
    });
  });

  it("should find grid by a user", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.grid).toBeDefined();
      expect(testContext.user).toBeDefined();
      if (!testContext.grid || !testContext.user) {
        return;
      }
      const foundGrids = await GridRepository.findAllGridsForUser(
        testContext.user.id,
        trx
      );
      expect(foundGrids[0]);
    });
  });

  test.todo("should find multiple grids for a user");

  /** UPDATE */

  test.todo("should update grid title");

  it("should increment grid comment count", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.grid).toBeDefined();
      if (!testContext.grid) {
        return;
      }
      await GridRepository.incrementGridCommentCount(testContext.grid.id, trx);
      const updatedGrid = await GridRepository.findGridById(
        testContext.grid.id,
        trx
      );
      expect(updatedGrid).toBeDefined();
      if (!updatedGrid) {
        console.error("ya didnt get the updated grid idiot");
        return;
      }
      expect(updatedGrid.commentCount).toEqual(
        testContext.grid.commentCount + 1
      );
    });
  });

  it("should decrement grid comment count", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.grid).toBeDefined();
      if (!testContext.grid) {
        return;
      }

      const currentGridState = await GridRepository.findGridById(
        testContext.grid.id,
        trx
      );
      expect(currentGridState).toBeDefined();
      if (!currentGridState) {
        return;
      }

      await GridRepository.decrementGridCommentCount(currentGridState.id, trx);

      const updatedGrid = await GridRepository.findGridById(
        testContext.grid.id,
        trx
      );
      expect(updatedGrid).toBeDefined();
      if (!updatedGrid) {
        console.error("ya didnt get the updated grid idiot");
        return;
      }
      expect(updatedGrid.commentCount).toEqual(
        currentGridState.commentCount - 1
      );
    });
  });

  it("should increment grid point count", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.grid).toBeDefined();
      if (!testContext.grid) {
        return;
      }
      await GridRepository.incrementGridPointCount(testContext.grid.id, trx);
      const updatedGrid = await GridRepository.findGridById(
        testContext.grid.id,
        trx
      );
      expect(updatedGrid).toBeDefined();
      if (!updatedGrid) {
        console.error("ya didnt get the updated grid idiot");
        return;
      }
      expect(updatedGrid.gridPointCount).toEqual(
        testContext.grid.gridPointCount + 1
      );
    });
  });

  it("should decrement grid point count", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.grid).toBeDefined();
      if (!testContext.grid) {
        return;
      }

      const currentGridState = await GridRepository.findGridById(
        testContext.grid.id,
        trx
      );
      expect(currentGridState).toBeDefined();
      if (!currentGridState) {
        return;
      }

      await GridRepository.decrementGridPointCount(currentGridState.id, trx);

      const updatedGrid = await GridRepository.findGridById(
        testContext.grid.id,
        trx
      );
      expect(updatedGrid).toBeDefined();
      if (!updatedGrid) {
        console.error("ya didnt get the updated grid idiot");
        return;
      }
      expect(updatedGrid.gridPointCount).toEqual(
        currentGridState.gridPointCount - 1
      );
    });
  });

  /** DELETE */

  it("should delete grid", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.grid).toBeDefined();
      if (!testContext.grid) {
        return;
      }
      await GridRepository.deleteGrid(testContext.grid.id, trx);
      const deletedGrid = await GridRepository.findGridById(
        testContext.grid.id,
        trx
      );
      expect(deletedGrid).toBeUndefined();
    });
  });

  it("should delete user", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.user).toBeDefined();
      if (!testContext.user) {
        return;
      }
      await UserRepository.deleteUser(testContext.user.id, trx);
      const deletedUser = await GridRepository.findGridById(
        testContext.user.id,
        trx
      );
      expect(deletedUser).toBeUndefined();
    });
  });
});

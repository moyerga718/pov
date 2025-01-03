import { Comment } from "../Comment/Table";
import { Grid } from "../Grid/Table";
import { NewUser, User } from "../User/Table";
import { GridPoint } from "./Table";
import * as UserRepository from "../User/Repository";
import * as GridRepository from "../Grid/Repository";
import * as CommentRepository from "../Comment/Repository";
import * as GridPointRepository from "./Repository";
import { createRandomUser } from "../User/Factory";
import { createRandomGrid } from "../Grid/Factory";
import { createRandomComments } from "../Comment/Factory";
import { createRandomGridPoints } from "./Factory";
import { runInTransaction } from "../../transactions/runInTransaction";

describe("GridPointRepository", () => {
  const testContext: {
    user: User | undefined;
    grid: Grid | undefined;
    comment: Comment | undefined;
    gridPoints: GridPoint[];
  } = {
    user: undefined,
    grid: undefined,
    comment: undefined,
    gridPoints: [],
  };

  const testUserInput: NewUser = createRandomUser();

  /** CREATE */

  it("should create a user", async () => {
    await runInTransaction(async (trx) => {
      const testUser = await UserRepository.createUser(testUserInput, trx);
      expect(testUser.firstName).toEqual(testUserInput.firstName);
      expect(testUser.lastName).toEqual(testUserInput.lastName);
      expect(testUser.username).toEqual(testUserInput.username);
      expect(testUser.createdAt).toBeDefined();
      expect(testUser.updatedAt).toBeNull();
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

  it("should create a comment", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.user).toBeDefined();
      expect(testContext.grid).toBeDefined();
      if (!testContext.user || !testContext.grid) {
        console.error("no test user or grid, BITCH");
        return;
      }

      const testCommentInput = createRandomComments(
        testContext.user.id,
        testContext.grid.id,
        null,
        null
      )[0];
      const testComment = await CommentRepository.createComment(
        testCommentInput,
        trx
      );
      expect(testComment).toEqual(expect.objectContaining(testCommentInput));
      if (!testComment) {
        console.error("test comment didnt get made :c");
        return;
      }
      testContext.comment = testComment;
    });
  });

  it("should create a grid point", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.user).toBeDefined();
      expect(testContext.grid).toBeDefined();
      expect(testContext.comment).toBeDefined();
      if (!testContext.user || !testContext.grid || !testContext.comment) {
        console.error("no test user or grid or comment, BITCH");
        return;
      }
      const testGridPointInput = createRandomGridPoints(
        testContext.user.id,
        testContext.grid.id,
        testContext.comment.id
      )[0];
      const testGridPoint = await GridPointRepository.createGridPoint(
        testGridPointInput,
        trx
      );
      expect(testGridPoint).toBeDefined();
      expect(testGridPoint).toEqual(
        expect.objectContaining(testGridPointInput)
      );
      testContext.gridPoints.push(testGridPoint);
    });
  });

  /** READ */

  it("should find a grid point with the given id", async () => {
    await runInTransaction(async (trx) => {
      const foundGridPoint = await GridPointRepository.findGridPointById(
        testContext.gridPoints[0].id,
        trx
      );
      expect(foundGridPoint).toEqual(testContext.gridPoints[0]);
    });
  });

  it("should find all grid points for a grid id", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.grid).toBeDefined();
      if (!testContext.grid) {
        console.error("no grid bitch");
        return;
      }
      const foundGridPoints =
        await GridPointRepository.findAllGridPointsForGrid(
          testContext.grid.id,
          trx
        );
      expect(foundGridPoints).toEqual(
        expect.arrayContaining(
          testContext.gridPoints.map((gridPoint) => {
            return expect.objectContaining(gridPoint);
          })
        )
      );
    });
  });

  test.todo("should find all grid points for a user");

  test.todo("should find a grid point for a grid and user");

  /** UPDATE */

  test.todo("it should update the comment");

  /** DELETE */

  it("should delete grid points", async () => {
    await runInTransaction(async (trx) => {
      for (const gridPoint of testContext.gridPoints) {
        await GridPointRepository.deleteGridPoint(gridPoint.id, trx);
        const deletedGridPoint = await GridPointRepository.findGridPointById(
          gridPoint.id,
          trx
        );
        expect(deletedGridPoint).toBeUndefined();
      }
    });
  });

  it("should delete comment", async () => {
    await runInTransaction(async (trx) => {
      if (!testContext.comment) {
        console.error("THERES NO COMMENT GET THE FUCK OVER IT");
        return;
      }
      expect(testContext.comment).toBeDefined();
      await CommentRepository.deleteComment(testContext.comment.id, trx);
      const deletedComment = await CommentRepository.findCommentById(
        testContext.comment.id,
        trx
      );
      expect(deletedComment).toBeUndefined();
    });
  });

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
      const deletedUser = await UserRepository.findUserById(
        testContext.user.id,
        trx
      );
      expect(deletedUser).toBeUndefined();
    });
  });
});

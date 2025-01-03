import { NewUser, User } from "../User/Table";
import { Grid } from "../Grid/Table";
import { Comment } from "./Table";
import { createRandomUser } from "../User/Factory";
import { createRandomGrid } from "../Grid/Factory";
import { createRandomComments } from "./Factory";
import * as UserRepository from "../User/Repository";
import * as GridRepository from "../Grid/Repository";
import * as CommentRepository from "../Comment/Repository";
import { runInTransaction } from "../../transactions/runInTransaction";

describe("CommentRepository", () => {
  const testContext: {
    user: User | undefined;
    grid: Grid | undefined;
    comment: Comment | undefined;
  } = {
    user: undefined,
    grid: undefined,
    comment: undefined,
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

  /** READ  */

  it("should find a comment with a given id", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.comment).toBeDefined();
      if (!testContext.comment) {
        console.error("no comment bitch");
        return;
      }
      const foundComment = await CommentRepository.findCommentById(
        testContext.comment.id,
        trx
      );
      expect(foundComment).toEqual(testContext.comment);
    });
  });

  test.todo("should find all comments for a user");

  test.todo("should find all comments for a grid");

  test.todo("should find all child comments for parent comment...");

  /** UPDATE */

  test.todo("it should update the comment");

  it("should increment comment child comment count", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.comment).toBeDefined();
      if (!testContext.comment) {
        return;
      }
      await CommentRepository.incrementCommentChildrenCount(
        testContext.comment.id,
        trx
      );
      const updatedComment = await CommentRepository.findCommentById(
        testContext.comment.id,
        trx
      );
      expect(updatedComment).toBeDefined();
      if (!updatedComment) {
        console.error("ya didnt get the updated Comment idiot");
        return;
      }
      expect(updatedComment.commentCount).toEqual(
        testContext.comment.commentCount + 1
      );
    });
  });

  it("should decrement comment child comment count", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.comment).toBeDefined();
      if (!testContext.comment) {
        return;
      }

      const currentCommentState = await CommentRepository.findCommentById(
        testContext.comment.id,
        trx
      );
      expect(currentCommentState).toBeDefined();
      if (!currentCommentState) {
        return;
      }

      await CommentRepository.decrementCommentChildrenCount(
        currentCommentState.id,
        trx
      );

      const updatedComment = await CommentRepository.findCommentById(
        testContext.comment.id,
        trx
      );
      expect(updatedComment).toBeDefined();
      if (!updatedComment) {
        console.error("ya didnt get the updated Comment idiot");
        return;
      }
      expect(updatedComment.commentCount).toEqual(
        currentCommentState.commentCount - 1
      );
    });
  });

  it("should increment comment vote count", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.comment).toBeDefined();
      if (!testContext.comment) {
        return;
      }
      await CommentRepository.incrementCommentVoteCount(
        testContext.comment.id,
        trx
      );
      const updatedComment = await CommentRepository.findCommentById(
        testContext.comment.id,
        trx
      );
      expect(updatedComment).toBeDefined();
      if (!updatedComment) {
        console.error("ya didnt get the updated Comment idiot");
        return;
      }
      expect(updatedComment.voteCount).toEqual(
        testContext.comment.voteCount + 1
      );
    });
  });

  it("should decrement comment vote count", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.comment).toBeDefined();
      if (!testContext.comment) {
        return;
      }

      const currentCommentState = await CommentRepository.findCommentById(
        testContext.comment.id,
        trx
      );
      expect(currentCommentState).toBeDefined();
      if (!currentCommentState) {
        return;
      }

      await CommentRepository.decrementCommentVoteCount(
        currentCommentState.id,
        trx
      );

      const updatedComment = await CommentRepository.findCommentById(
        testContext.comment.id,
        trx
      );
      expect(updatedComment).toBeDefined();
      if (!updatedComment) {
        console.error("ya didnt get the updated Comment idiot");
        return;
      }
      expect(updatedComment.voteCount).toEqual(
        currentCommentState.voteCount - 1
      );
    });
  });

  /** DELETE */

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

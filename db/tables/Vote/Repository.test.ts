import { Grid } from "../Grid/Table";
import { createRandomUser } from "../User/Factory";
import { NewUser, User } from "../User/Table";
import { Comment } from "../Comment/Table";
import { Vote } from "./Table";
import * as UserRepository from "../User/Repository";
import * as GridRepository from "../Grid/Repository";
import * as CommentRepository from "../Comment/Repository";
import * as VoteRepository from "../Vote/Repository";
import { createRandomGrid } from "../Grid/Factory";
import { createRandomComments } from "../Comment/Factory";
import { VoteType } from "./Constants/VoteType";
import { runInTransaction } from "../../transactions/runInTransaction";

describe("VoteRepository", async () => {
  const testContext: {
    user1: User | undefined;
    user2: User | undefined;
    grid: Grid | undefined;
    comment1: Comment | undefined;
    comment2: Comment | undefined;
    upvote: Vote | undefined;
    downvote: Vote | undefined;
  } = {
    user1: undefined,
    user2: undefined,
    grid: undefined,
    comment1: undefined,
    comment2: undefined,
    upvote: undefined,
    downvote: undefined,
  };

  const testUser1Input: NewUser = await createRandomUser();
  const testUser2Input: NewUser = await createRandomUser();

  /** CREATE  */

  it("should create users (to vote)", async () => {
    await runInTransaction(async (trx) => {
      const testUser1 = await UserRepository.createUser(testUser1Input, trx);
      expect(testUser1.firstName).toEqual(testUser1Input.firstName);
      expect(testUser1.lastName).toEqual(testUser1Input.lastName);
      expect(testUser1.username).toEqual(testUser1Input.username);
      expect(testUser1.createdAt).toBeDefined();
      expect(testUser1.updatedAt).toBeNull();
      testContext.user1 = testUser1;

      const testUser2 = await UserRepository.createUser(testUser2Input, trx);
      expect(testUser2.firstName).toEqual(testUser2Input.firstName);
      expect(testUser2.lastName).toEqual(testUser2Input.lastName);
      expect(testUser2.username).toEqual(testUser2Input.username);
      expect(testUser2.createdAt).toBeDefined();
      expect(testUser2.updatedAt).toBeNull();
      testContext.user2 = testUser2;
    });
  });

  it("should create a grid", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.user1).toBeDefined();
      if (!testContext.user1) {
        console.error("no test user");
        return;
      }
      const testGridInput = createRandomGrid(testContext.user1.id);
      const testGrid = await GridRepository.createGrid(testGridInput, trx);
      expect(testGrid).toBeDefined();
      testContext.grid = testGrid;
    });
  });

  it("should create comments", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.user1).toBeDefined();
      expect(testContext.user2).toBeDefined();
      expect(testContext.grid).toBeDefined();
      if (!testContext.user1 || !testContext.user2 || !testContext.grid) {
        console.error("no test user or grid, BITCH");
        return;
      }

      const testComment1Input = createRandomComments(
        testContext.user1.id,
        testContext.grid.id,
        null,
        null
      )[0];
      const testComment1 = await CommentRepository.createComment(
        testComment1Input,
        trx
      );
      expect(testComment1).toEqual(expect.objectContaining(testComment1Input));
      if (!testComment1) {
        console.error("test comment 1 didnt get made :c");
        return;
      }
      testContext.comment1 = testComment1;

      const testComment2Input = createRandomComments(
        testContext.user1.id,
        testContext.grid.id,
        null,
        null
      )[0];
      const testComment2 = await CommentRepository.createComment(
        testComment2Input,
        trx
      );
      expect(testComment2).toEqual(expect.objectContaining(testComment2Input));
      if (!testComment2) {
        console.error("test comment 2 didnt get made :c");
        return;
      }
      testContext.comment2 = testComment2;
    });
  });

  it("should create an upvote (comment 1)", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.user2).toBeDefined();
      expect(testContext.comment1).toBeDefined();
      if (!testContext.user2 || !testContext.comment1) {
        console.error("u dont got the biz to vote");
        return;
      }

      const newUpvote = await VoteRepository.createUpvote(
        testContext.user2.id,
        testContext.comment1.id,
        trx
      );
      expect(newUpvote).toEqual(
        expect.objectContaining({
          userId: testContext.user2.id,
          commentId: testContext.comment1.id,
          voteType: VoteType.UPVOTE,
        })
      );
      testContext.upvote = newUpvote;
    });
  });

  it("should create an downvote (comment 2)", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.user1).toBeDefined();
      expect(testContext.comment2).toBeDefined();
      if (!testContext.user1 || !testContext.comment2) {
        console.error("u dont got the biz to vote");
        return;
      }

      const newDownvote = await VoteRepository.createDownvote(
        testContext.user1.id,
        testContext.comment2.id,
        trx
      );
      expect(newDownvote).toEqual(
        expect.objectContaining({
          userId: testContext.user1.id,
          commentId: testContext.comment2.id,
          voteType: VoteType.DOWNVOTE,
        })
      );
      testContext.downvote = newDownvote;
    });
  });

  /** READ */

  it("should find vote by id", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.upvote).toBeDefined();
      if (!testContext.upvote) {
        console.error("dont have the upvote bitch");
        return;
      }
      const foundVote = await VoteRepository.findVoteById(
        testContext.upvote.id,
        trx
      );
      expect(foundVote).toEqual(testContext.upvote);
    });
  });

  it("should find vote by user id and comment id", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.downvote).toBeDefined();
      if (!testContext.downvote) {
        console.error("u dont have downvote bitch");
        return;
      }

      const foundVote = await VoteRepository.findVoteByCommentAndUserId(
        testContext.downvote.commentId,
        testContext.downvote.userId,
        trx
      );
      expect(foundVote).toEqual(testContext.downvote);
    });
  });

  /** UPDATE */

  it("should update vote type by id", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.upvote).toBeDefined();
      if (!testContext.upvote) {
        console.error("no UPVOTE bitch....?");
        return;
      }

      await VoteRepository.updateVoteTypeById(
        testContext.upvote.id,
        VoteType.DOWNVOTE,
        trx
      );
      const foundUpvote = await VoteRepository.findVoteById(
        testContext.upvote.id,
        trx
      );
      expect(foundUpvote).toEqual(
        expect.objectContaining({
          userId: testContext.upvote.userId,
          commentId: testContext.upvote.commentId,
          voteType: VoteType.DOWNVOTE,
        })
      );
    });
  });

  it("should update vote type by comment id and user id", async () => {
    await runInTransaction(async (trx) => {
      expect(testContext.downvote).toBeDefined();
      if (!testContext.downvote) {
        console.error("no downvote bitch....?");
        return;
      }

      await VoteRepository.updateVoteTypeById(
        testContext.downvote.id,
        VoteType.UPVOTE,
        trx
      );
      const foundDownVote = await VoteRepository.findVoteById(
        testContext.downvote.id,
        trx
      );
      expect(foundDownVote).toEqual(
        expect.objectContaining({
          userId: testContext.downvote.userId,
          commentId: testContext.downvote.commentId,
          voteType: VoteType.UPVOTE,
        })
      );
    });
  });

  /** DELETE */

  it("should delete votes", async () => {
    await runInTransaction(async (trx) => {
      // downvote
      expect(testContext.downvote).toBeDefined();
      if (!testContext.downvote) {
        console.error("no downvote bitch....?");
        return;
      }
      await VoteRepository.deleteVoteById(testContext.downvote.id, trx);
      const deletedDownvote = await VoteRepository.findVoteById(
        testContext.downvote.id,
        trx
      );
      expect(deletedDownvote).toBeUndefined();

      // upvote
      expect(testContext.upvote).toBeDefined();
      if (!testContext.upvote) {
        console.error("no upvote bitch....?");
        return;
      }
      await VoteRepository.deleteVoteById(testContext.upvote.id, trx);
      const deletedUpvote = await VoteRepository.findVoteById(
        testContext.upvote.id,
        trx
      );
      expect(deletedUpvote).toBeUndefined();
    });
  });

  it("should delete comments", async () => {
    await runInTransaction(async (trx) => {
      // comment 1
      if (!testContext.comment1) {
        console.error("THERES NO comment1 GET THE FUCK OVER IT");
        return;
      }
      expect(testContext.comment1).toBeDefined();
      await CommentRepository.deleteComment(testContext.comment1.id, trx);
      const deletedComment1 = await CommentRepository.findCommentById(
        testContext.comment1.id,
        trx
      );
      expect(deletedComment1).toBeUndefined();

      // comment 2
      if (!testContext.comment2) {
        console.error("THERES NO COMMENT GET THE FUCK OVER IT");
        return;
      }
      expect(testContext.comment2).toBeDefined();
      await CommentRepository.deleteComment(testContext.comment2.id, trx);
      const deletedComment2 = await CommentRepository.findCommentById(
        testContext.comment2.id,
        trx
      );
      expect(deletedComment2).toBeUndefined();
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

  it("should delete users", async () => {
    await runInTransaction(async (trx) => {
      // user 1
      expect(testContext.user1).toBeDefined();
      if (!testContext.user1) {
        return;
      }
      await UserRepository.deleteUser(testContext.user1.id, trx);
      const deletedUser1 = await UserRepository.findUserById(
        testContext.user1.id,
        trx
      );
      expect(deletedUser1).toBeUndefined();

      // user 2
      expect(testContext.user2).toBeDefined();
      if (!testContext.user2) {
        return;
      }
      await UserRepository.deleteUser(testContext.user2.id, trx);
      const deletedUser2 = await UserRepository.findUserById(
        testContext.user2.id,
        trx
      );
      expect(deletedUser2).toBeUndefined();
    });
  });
});

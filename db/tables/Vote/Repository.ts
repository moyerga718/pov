import { db } from "../../dbConnection";
import { VoteType } from "./Constants/VoteType";

/** CREATE */

export async function createUpvote(userId: number, commentId: number) {
  return await db
    .insertInto("vote")
    .values({
      userId: userId,
      commentId: commentId,
      voteType: VoteType.UPVOTE,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function createDownvote(userId: number, commentId: number) {
  return await db
    .insertInto("vote")
    .values({
      userId: userId,
      commentId: commentId,
      voteType: VoteType.DOWNVOTE,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

/** READ  */

export async function findVoteById(id: number) {
  return await db
    .selectFrom("vote")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findVoteByCommentAndUserId(
  commentId: number,
  userId: number
) {
  return await db
    .selectFrom("vote")
    .where("commentId", "=", commentId)
    .where("userId", "=", userId)
    .selectAll()
    .executeTakeFirst();
}

/** UPDATE */

export async function updateVoteTypeById(id: number, newVoteType: VoteType) {
  await db
    .updateTable("vote")
    .set({
      voteType: newVoteType,
    })
    .where("id", "=", id)
    .execute();
}

export async function updateVoteTypeByCommentAndUserId(
  commentId: number,
  userId: number,
  newVoteType: VoteType
) {
  return await db
    .updateTable("vote")
    .set({
      voteType: newVoteType,
    })
    .where("commentId", "=", commentId)
    .where("userId", "=", userId)
    .execute();
}

/** DELETE */

export async function deleteVoteById(id: number) {
  return await db
    .deleteFrom("vote")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}

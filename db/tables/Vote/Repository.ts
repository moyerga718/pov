import { Transaction } from "kysely";
import { db } from "../../dbConnection";
import { VoteType } from "./Constants/VoteType";
import { Database } from "../Database";

/** CREATE */

export async function createUpvote(
  userId: number,
  commentId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .insertInto("vote")
    .values({
      userId: userId,
      commentId: commentId,
      voteType: VoteType.UPVOTE,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function createDownvote(
  userId: number,
  commentId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
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

export async function findVoteById(id: number, trx: Transaction<Database>) {
  return await (trx ? trx : db)
    .selectFrom("vote")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findVoteByCommentAndUserId(
  commentId: number,
  userId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .selectFrom("vote")
    .where("commentId", "=", commentId)
    .where("userId", "=", userId)
    .selectAll()
    .executeTakeFirst();
}

/** UPDATE */

export async function updateVoteTypeById(
  id: number,
  newVoteType: VoteType,
  trx: Transaction<Database>
) {
  await (trx ? trx : db)
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
  newVoteType: VoteType,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .updateTable("vote")
    .set({
      voteType: newVoteType,
    })
    .where("commentId", "=", commentId)
    .where("userId", "=", userId)
    .execute();
}

/** DELETE */

export async function deleteVoteById(id: number, trx: Transaction<Database>) {
  return await (trx ? trx : db)
    .deleteFrom("vote")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}

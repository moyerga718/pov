import { Transaction } from "kysely";
import { CommentUpdate, NewComment } from "./Table";
import { Database } from "../Database";
import { db } from "../../dbConnection";

/** CREATE */

export async function createComment(
  comment: NewComment,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .insertInto("comment")
    .values(comment)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/** READ */

export async function findCommentById(id: number, trx: Transaction<Database>) {
  return await (trx ? trx : db)
    .selectFrom("comment")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findAllCommentsForGrid(
  gridId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .selectFrom("comment")
    .where("gridId", "=", gridId)
    .selectAll()
    .execute();
}

export async function findAllCommentsForUser(
  userId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .selectFrom("comment")
    .where("userId", "=", userId)
    .selectAll()
    .execute();
}

export async function findAllDirectChildComments(
  parentCommentId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .selectFrom("comment")
    .where("parentCommentId", "=", parentCommentId)
    .selectAll()
    .execute();
}

export async function findAllChildrenOfTopLevelComments(
  topLevelCommentId: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .selectFrom("comment")
    .where("topLevelCommentId", "=", topLevelCommentId)
    .selectAll()
    .execute();
}

/** UPDATE */

export async function updateComment(
  id: number,
  updateWith: CommentUpdate,
  trx: Transaction<Database>
) {
  await (trx ? trx : db)
    .updateTable("comment")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function incrementCommentVoteCount(
  id: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .updateTable("comment")
    .set((eb) => ({
      voteCount: eb("voteCount", "+", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function decrementCommentVoteCount(
  id: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .updateTable("comment")
    .set((eb) => ({
      voteCount: eb("voteCount", "-", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function incrementCommentChildrenCount(
  id: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .updateTable("comment")
    .set((eb) => ({
      commentCount: eb("commentCount", "+", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function decrementCommentChildrenCount(
  id: number,
  trx: Transaction<Database>
) {
  return await (trx ? trx : db)
    .updateTable("comment")
    .set((eb) => ({
      commentCount: eb("commentCount", "-", 1),
    }))
    .where("id", "=", id)
    .execute();
}

/** DELETE */

export async function deleteComment(id: number, trx: Transaction<Database>) {
  return await (trx ? trx : trx ? trx : db)
    .deleteFrom("comment")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}

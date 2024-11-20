import { db } from "../../dbConnection";
import { CommentUpdate, NewComment } from "./Table";

/** CREATE */

export async function createComment(comment: NewComment) {
  return await db
    .insertInto("comment")
    .values(comment)
    .returningAll()
    .executeTakeFirstOrThrow();
}

/** READ */

export async function findCommentById(id: number) {
  return await db
    .selectFrom("comment")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function findAllCommentsForGrid(gridId: number) {
  return await db
    .selectFrom("comment")
    .where("gridId", "=", gridId)
    .selectAll()
    .execute();
}

export async function findAllCommentsForUser(userId: number) {
  return await db
    .selectFrom("comment")
    .where("userId", "=", userId)
    .selectAll()
    .execute();
}

export async function findAllDirectChildComments(parentCommentId: number) {
  return await db
    .selectFrom("comment")
    .where("parentCommentId", "=", parentCommentId)
    .selectAll()
    .execute();
}

export async function findAllChildrenOfTopLevelComments(
  topLevelCommentId: number
) {
  return await db
    .selectFrom("comment")
    .where("topLevelCommentId", "=", topLevelCommentId)
    .selectAll()
    .execute();
}

/** UPDATE */

export async function updateComment(id: number, updateWith: CommentUpdate) {
  await db
    .updateTable("comment")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function incrementCommentVoteCount(id: number) {
  return await db
    .updateTable("comment")
    .set((eb) => ({
      voteCount: eb("voteCount", "+", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function decrementCommentVoteCount(id: number) {
  return await db
    .updateTable("comment")
    .set((eb) => ({
      voteCount: eb("voteCount", "-", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function incrementCommentChildrenCount(id: number) {
  return await db
    .updateTable("comment")
    .set((eb) => ({
      commentCount: eb("commentCount", "+", 1),
    }))
    .where("id", "=", id)
    .execute();
}

export async function decrementCommentChildrenCount(id: number) {
  return await db
    .updateTable("comment")
    .set((eb) => ({
      commentCount: eb("commentCount", "-", 1),
    }))
    .where("id", "=", id)
    .execute();
}

/** DELETE */

export async function deleteComment(id: number) {
  return await db
    .deleteFrom("comment")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}

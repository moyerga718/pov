import { faker } from "@faker-js/faker";
import { NewComment } from "./Table";

function createRandomComment(
  userId: number,
  gridId: number,
  parentCommentId: number | null,
  topLevelCommentId: number | null
): NewComment {
  return {
    userId,
    gridId,
    text: faker.lorem.sentence(),
    voteCount: 0,
    commentCount: 0,
    parentCommentId,
    topLevelCommentId,
  };
}

export function createRandomComments(
  userId: number,
  gridId: number,
  parentCommentId: number | null,
  topLevelCommentId: number | null,
  numberOfComments: number = 1
): NewComment[] {
  const grids: NewComment[] = [];
  for (let i = 0; i < numberOfComments; i++) {
    grids.push(
      createRandomComment(userId, gridId, parentCommentId, topLevelCommentId)
    );
  }
  return grids;
}

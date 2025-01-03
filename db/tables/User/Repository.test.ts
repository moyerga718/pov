import * as UserRepository from "./Repository";
import { NewUser, User } from "./Table";
import { createRandomUser } from "./Factory";
import { runInTransaction } from "../../transactions/runInTransaction";

describe("UserRepository", () => {
  const testContext: User[] = [];
  const testUserInput: NewUser = createRandomUser();

  /** CREATE */

  it("should create a user", async () => {
    await runInTransaction(async (trx) => {
      const testUser = await UserRepository.createUser(testUserInput, trx);
      expect(testUser.firstName).toEqual(testUserInput.firstName);
      expect(testUser.lastName).toEqual(testUserInput.lastName);
      expect(testUser.username).toEqual(testUserInput.username);
      expect(testUser.email).toEqual(testUserInput.email);
      expect(testUser.uuid).toBeDefined();
      expect(testUser.createdAt).toBeDefined();
      expect(testUser.updatedAt).toBeNull();
      testContext.push(testUser);
    });
  });

  /** READ */

  it("should find a user with a given id", async () => {
    await runInTransaction(async (trx) => {
      const testUser = testContext[0];
      expect(testUser).toBeDefined();
      const foundUser = await UserRepository.findUserById(testUser.id, trx);
      expect(foundUser).toEqual(testUser);
    });
  });

  it("should find all people users by first name", async () => {
    await runInTransaction(async (trx) => {
      const testUser = testContext;
      expect(testUser).toBeDefined();
      const foundUsers = await UserRepository.findUsers(
        {
          firstName: testUserInput.firstName,
        },
        trx
      );
      expect(foundUsers).toEqual(testUser);
    });
  });

  /** UPDATE */

  test.todo("it should update the user....");

  /** DELETE */

  it("should delete a User with a given id", async () => {
    await runInTransaction(async (trx) => {
      const testUser = testContext[0];
      expect(testUser).toBeDefined();
      await UserRepository.deleteUser(testUser.id, trx);
      const foundTestUser = await UserRepository.findUserById(testUser.id, trx);
      expect(foundTestUser).toBeUndefined();
    });
  });
});

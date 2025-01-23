import * as UserRepository from "./Repository";
import { NewUser, User } from "./Table";
import { createRandomUser } from "./Factory";
import { runInTransaction } from "../../transactions/runInTransaction";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

describe("UserRepository", async () => {
  const testContext: User[] = [];

  const testUserPassword = faker.internet.password();
  const testUserInput: NewUser = await createRandomUser(testUserPassword);

  /** CREATE */

  it("should create a user", async () => {
    await runInTransaction(async (trx) => {
      const testUser = await UserRepository.createUser(testUserInput, trx);
      expect(testUser.firstName).toEqual(testUserInput.firstName);
      expect(testUser.lastName).toEqual(testUserInput.lastName);
      expect(testUser.username).toEqual(testUserInput.username);
      expect(testUser.email).toEqual(testUserInput.email);
      expect(testUser.createdAt).toBeDefined();
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

  it("should find user object by username, verify password hash", async () => {
    await runInTransaction(async (trx) => {
      const testUser = testContext[0];
      expect(testUser).toBeDefined();
      const foundUser = await UserRepository.getUserWithHashByUsername(
        testUser.username,
        trx
      );
      if (!foundUser) {
        return;
      }
      const passwordMatches = await bcrypt.compare(
        testUserPassword,
        foundUser.hash.toString()
      );
      expect(passwordMatches).toBeTruthy();
      expect(foundUser?.id).toEqual(testUser.id);
    });
  });

  it("should find all people users by first name", async () => {
    await runInTransaction(async (trx) => {
      const testUser = testContext;
      expect(testUser).toBeDefined();
      const foundUsers = await UserRepository.searchUsers(
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

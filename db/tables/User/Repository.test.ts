import * as UserRepository from "./Repository";
import { NewUser, User } from "./Table";
import { createRandomUser } from "./Factory";

describe("UserRepository", () => {
  const testContext: User[] = [];
  const testUserInput: NewUser = createRandomUser();
  console.log(testUserInput);

  it("should create a user", async () => {
    const testUser = await UserRepository.createUser(testUserInput);
    expect(testUser.first_name).toEqual(testUserInput.first_name);
    expect(testUser.last_name).toEqual(testUserInput.last_name);
    expect(testUser.username).toEqual(testUserInput.username);
    expect(testUser.created_at).toBeDefined();
    expect(testUser.updated_at).toBeNull();
    testContext.push(testUser);
  });

  it("should find a user with a given id", async () => {
    const testUser = testContext[0];
    expect(testUser).toBeDefined();
    const foundUser = await UserRepository.findUserById(testUser.id);
    expect(foundUser).toEqual(testUser);
  });

  it("should find all people users by first name", async () => {
    const testUser = testContext;
    expect(testUser).toBeDefined();
    const foundUsers = await UserRepository.findUsers({
      first_name: testUserInput.first_name,
    });
    expect(foundUsers).toEqual(testUser);
  });

  it("should delete a User with a given id", async () => {
    const testUser = testContext[0];
    expect(testUser).toBeDefined();
    await UserRepository.deleteUser(testUser.id);
    const foundTestUser = await UserRepository.findUserById(testUser.id);
    expect(foundTestUser).toBeUndefined();
  });
});

import { faker } from "@faker-js/faker";
import { NewUser } from "./Table";

export function createRandomUser(): NewUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.username({ firstName, lastName });
  const email = faker.internet.email({ firstName, lastName });

  return {
    firstName: firstName,
    lastName: lastName,
    username,
    email,
  };
}

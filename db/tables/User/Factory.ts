import { faker } from "@faker-js/faker";
import { NewUser } from "./Table";

export function createRandomUser(): NewUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.username({ firstName, lastName });

  return {
    first_name: firstName,
    last_name: lastName,
    username,
  } as NewUser;
}

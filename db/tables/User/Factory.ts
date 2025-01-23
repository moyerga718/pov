import { faker } from "@faker-js/faker";
import { NewUser } from "./Table";
import bcrypt from "bcrypt";

export async function createRandomUser(password?: string): Promise<NewUser> {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.username({ firstName, lastName });
  const email = faker.internet.email({ firstName, lastName });
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password ?? faker.internet.password(), salt);

  return {
    firstName: firstName,
    lastName: lastName,
    username,
    email,
    hash: Buffer.from(hash),
  };
}

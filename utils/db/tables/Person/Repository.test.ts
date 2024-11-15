import { sql } from "kysely";
import { db } from "../../dbConnection";
import * as PersonRepository from "./Repository";

describe("PersonRepository", () => {
  beforeAll(async () => {
    await db.schema
      .createTable("person")
      .addColumn("id", "serial", (cb) => cb.primaryKey())
      .addColumn("first_name", "varchar", (cb) => cb.notNull())
      .addColumn("last_name", "varchar")
      .addColumn("gender", "varchar(50)", (cb) => cb.notNull())
      .addColumn("metadata", "json")
      .addColumn("created_at", "timestamp", (cb) =>
        cb.notNull().defaultTo(sql`now()`)
      )
      .execute();
  });

  afterEach(async () => {
    await sql`truncate table ${sql.table("person")}`.execute(db);
  });

  afterAll(async () => {
    await db.schema.dropTable("person").execute();
  });

  it("should find a person with a given id", async () => {
    await PersonRepository.findPersonById(123);
  });

  it("should find all people named Arnold", async () => {
    await PersonRepository.findPeople({ first_name: "Arnold" });
  });

  it("should update gender of a person with a given id", async () => {
    await PersonRepository.updatePerson(123, { gender: "woman" });
  });

  it("should create a person", async () => {
    const myMetadata = {
      login_at: "jasl;kdjf",
      ip: null,
      agent: null,
      plan: "free",
    };

    await PersonRepository.createPerson({
      first_name: "Jennifer",
      last_name: "Aniston",
      gender: "woman",
      metadata: JSON.stringify(myMetadata),
    });
  });

  it("should delete a person with a given id", async () => {
    await PersonRepository.deletePerson(123);
  });
});

import fs from "fs";

function createMigrationFile() {
  const migrationName = `${Math.floor(Date.now() / 1000)}.ts`;

  // Hate suppressing typescript, but I can't import the needed type for that err variable... it needs ErrnoException | null.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function copyStatusMessageCallback(err: any) {
    if (err) {
      console.error("Error creating migration: ", err);
      return;
    }
    console.log(`Migration ${migrationName} successfully created.`);
  }

  fs.copyFile(
    "./db/migrations/helpers/sampleMigration.ts",
    `./db/migrations/${migrationName}`,
    copyStatusMessageCallback
  );
}

createMigrationFile();

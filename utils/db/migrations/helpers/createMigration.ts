import fs from "fs";

function CreateMigrationFile() {
  const migrationName = `${new Date().toISOString()}.ts`;

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
    "./utils/db/migrations/helpers/sampleMigration.ts",
    `./utils/db/migrations/${migrationName}`,
    copyStatusMessageCallback
  );
}

CreateMigrationFile();

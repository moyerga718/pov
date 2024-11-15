import { PersonTable } from "./Person/Table";
import { PetTable } from "./Pet/Table";

export interface Database {
  person: PersonTable;
  pet: PetTable;
}

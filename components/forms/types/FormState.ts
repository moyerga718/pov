/**
 * Used to communicate form state between server and client -
 * If an error occurs when saving a form on the server (zod error, db error, etc...), server will send back a generic message about what went wrong, and errors for any specific fields.
 */
export type FormState = {
  message: string;
  fieldErrors?: string[];
};

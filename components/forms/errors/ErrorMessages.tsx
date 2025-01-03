import { FormState } from "../types/FormState";

interface ErrorMessagesProps {
  formState: FormState;
}

export default function ErrorMessages({ formState }: ErrorMessagesProps) {
  return (
    <>
      <p aria-live="polite" className="text-red-500">
        {formState?.message}
      </p>
      {formState.fieldErrors && (
        <div>
          <ul>
            {formState.fieldErrors.map((fieldError) => (
              <li key={fieldError} className="flex gap-1 text-red-500">
                {fieldError}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

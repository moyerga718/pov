interface SubmitButtonProps {
  pending: boolean;
}

/**
 * Reusable submit button for forms. Simple component, but used to keep all forms looking consistent throughout app.
 * @pending boolean
 * @returns <input>
 */
export default function SubmitButton({ pending }: SubmitButtonProps) {
  return <input type="submit" disabled={pending} />;
}

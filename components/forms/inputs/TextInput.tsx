import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface TextInputProps<TFormValues extends FieldValues> {
  fieldName: Path<TFormValues>;
  labelName?: string /** if not provided, label will default to capitalized and space separated field name. */;
  placeholder: string;
  classOverride?: string;
  registerFunction: UseFormRegister<TFormValues>;
  registerOptions: RegisterOptions<TFormValues>;
  fieldError?: FieldError;
}

export default function TextInput<TFormValues extends FieldValues>({
  fieldName,
  labelName,
  placeholder,
  classOverride,
  registerFunction,
  registerOptions,
  fieldError,
}: TextInputProps<TFormValues>) {
  const defaultLabelName = fieldName
    .toString()
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  return (
    <>
      <label>{labelName ?? defaultLabelName}:</label>
      <input
        className={classOverride ?? "border"}
        placeholder={placeholder}
        {...registerFunction(fieldName, registerOptions)}
      />
      {fieldError && <p className="text-red-500">{fieldError.message}</p>}
    </>
  );
}

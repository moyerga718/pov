"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { FormType } from "../types/FormType";

type Inputs = {
  username: string;
};

interface LoginFormProps {
  setCurrentFormType: (formType: FormType) => void;
}

export default function LoginForm({ setCurrentFormType }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-2">
        <label>Username:</label>
        <input
          className="border"
          placeholder="jdingle"
          {...register("username", {
            required: true,
            maxLength: 20,
            minLength: 1,
          })}
        />

        {/* errors will return when field validation fails  */}
        {errors.username && (
          <p className="text-red-500">This field is required</p>
        )}

        <div className="flex flex-row justify-between">
          <button onClick={() => setCurrentFormType(FormType.REGISTER)}>
            or... register
          </button>
          <input type="submit" />
        </div>
      </div>
    </form>
  );
}

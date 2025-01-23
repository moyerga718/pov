"use client";

import { startTransition, useActionState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { FormType } from "../types/FormType";
import { LoginSchema } from "../schemas/LoginSchema";
import { Login } from "../actions/Login";

import ErrorMessages from "@/components/forms/errors/ErrorMessages";
import TextInput from "@/components/forms/inputs/TextInput";
import SubmitButton from "@/components/forms/buttons/SubmitButton";

interface LoginFormProps {
  setCurrentFormType: (formType: FormType) => void;
}
type LoginFormFields = z.output<typeof LoginSchema>;

export default function LoginForm({ setCurrentFormType }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(Login, {
    message: "",
    success: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = (data: LoginFormFields) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessages formState={state} />

      <div className="flex flex-col space-y-2">
        <TextInput<LoginFormFields>
          fieldName="username"
          placeholder="jdingle"
          registerFunction={register}
          registerOptions={{ required: true, maxLength: 20, minLength: 3 }}
          fieldError={errors.username}
        />

        <TextInput<LoginFormFields>
          fieldName="password"
          placeholder="********"
          registerFunction={register}
          registerOptions={{ required: true, maxLength: 20, minLength: 7 }}
          fieldError={errors.password}
        />

        <div className="flex flex-row justify-between">
          <button onClick={() => setCurrentFormType(FormType.REGISTER)}>
            or... register
          </button>
          <SubmitButton pending={pending} />
        </div>
      </div>
    </form>
  );
}

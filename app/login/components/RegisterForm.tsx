"use client";

import { startTransition, useActionState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { FormType } from "../types/FormType";
import { RegisterSchema } from "../schemas/RegisterSchema";
import { Register } from "../actions/Register";

import SubmitButton from "@/components/forms/buttons/SubmitButton";
import TextInput from "@/components/forms/inputs/TextInput";
import ErrorMessages from "@/components/forms/errors/ErrorMessages";

interface RegisterFormProps {
  setCurrentFormType: (formType: FormType) => void;
}
type RegisterFormFields = z.output<typeof RegisterSchema>;

export default function RegisterForm({
  setCurrentFormType,
}: RegisterFormProps) {
  const [state, formAction, pending] = useActionState(Register, {
    message: "",
    success: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = (
    data: RegisterFormFields
  ) => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("password", data.password);
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessages formState={state} />

      <div className="flex flex-col space-y-2">
        <TextInput<RegisterFormFields>
          fieldName="username"
          placeholder="jdingle"
          registerFunction={register}
          registerOptions={{ required: true, maxLength: 20, minLength: 1 }}
          fieldError={errors.username}
        />

        <TextInput<RegisterFormFields>
          fieldName="firstName"
          placeholder="John"
          registerFunction={register}
          registerOptions={{
            required: true,
            maxLength: 20,
            minLength: 1,
          }}
          fieldError={errors.firstName}
        />

        <TextInput<RegisterFormFields>
          fieldName="lastName"
          placeholder="Dingle"
          registerFunction={register}
          registerOptions={{
            required: true,
            maxLength: 20,
            minLength: 1,
          }}
          fieldError={errors.lastName}
        />

        <TextInput<RegisterFormFields>
          fieldName="email"
          placeholder="jdingle@gunk.net"
          registerFunction={register}
          registerOptions={{
            required: true,
            maxLength: 20,
            minLength: 1,
          }}
          fieldError={errors.email}
        />

        <TextInput<RegisterFormFields>
          fieldName="password"
          placeholder="*******"
          registerFunction={register}
          registerOptions={{
            required: true,
            maxLength: 20,
            minLength: 7,
          }}
          fieldError={errors.password}
        />

        <div className="flex flex-row justify-between">
          <button
            type="button"
            onClick={() => setCurrentFormType(FormType.LOGIN)}
          >
            Login as existing user
          </button>
          <SubmitButton pending={pending} />
        </div>
      </div>
    </form>
  );
}

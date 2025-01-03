// import { FormTypes } from "../types/FormTypes";

// interface LoginFormProps {
//   setCurrentFormType: (formType: FormTypes) => void;
// }

// export default function LoginForm({ setCurrentFormType }: LoginFormProps) {
//   const form = useForm({
//     mode: "uncontrolled",
//     initialValues: {
//       username: "",
//     },

//     validate: {
//       username: (value) =>
//         value.length > 3
//           ? null
//           : "Invalid username. Must be greater than 3 characters",
//     },
//   });

//   return (
//     <form onSubmit={form.onSubmit((values) => console.log(values))}>
//       <TextInput
//         withAsterisk
//         label="Username"
//         placeholder="jdingle"
//         key={form.key("username")}
//         {...form.getInputProps("username")}
//       />

//       <Group justify="flex-end" mt="md">
//         <Button
//           type="button"
//           onClick={() => setCurrentFormType(FormTypes.REGISTER)}
//         >
//           Dont have an account? Make one.
//         </Button>
//         <Button type="submit">Submit</Button>
//       </Group>
//     </form>
//   );
// }

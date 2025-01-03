// import { FormTypes } from "../types/FormTypes";
// import { Register } from "./actions";

// interface RegisterFormProps {
//   setCurrentFormType: (formType: FormTypes) => void;
// }

// export default function RegisterForm({
//   setCurrentFormType,
// }: RegisterFormProps) {
//   // Figure out what to do with try catch i don't think i should have this.
//   const handleSubmit = async (values: typeof form.values) => {
//     try {
//       await Register(values);
//     } catch {
//       console.error("uh oh");
//     }
//   };

//   // determine whether or not i should use mantine here. next docs suggest another method, but this seems fine.
//   const form = useForm({
//     mode: "uncontrolled",
//     initialValues: {
//       email: "",
//       username: "",
//       firstName: "",
//       lastName: "",
//     },

//     validate: {
//       email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
//       username: (value) =>
//         value.length > 3
//           ? null
//           : "Invalid username. Must be greater than 3 characters",
//       firstName: (value) => (value.length > 0 ? null : "Invalid first name."),
//       lastName: (value) => (value.length > 0 ? null : "Invalid first name."),
//     },
//   });

//   return (
//     <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
//       <TextInput
//         withAsterisk
//         label="Email"
//         placeholder="your@email.com"
//         key={form.key("email")}
//         {...form.getInputProps("email")}
//       />

//       <TextInput
//         withAsterisk
//         label="First Name"
//         placeholder="John"
//         key={form.key("firstName")}
//         {...form.getInputProps("firstName")}
//       />

//       <TextInput
//         withAsterisk
//         label="Last Name"
//         placeholder="Dingle"
//         key={form.key("lastName")}
//         {...form.getInputProps("lastName")}
//       />

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
//           onClick={() => setCurrentFormType(FormTypes.LOGIN)}
//         >
//           Already have an account? Log in idiot.
//         </Button>
//         <Button type="submit">Submit</Button>
//       </Group>
//     </form>
//   );
// }

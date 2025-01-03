// "use client";

// import LoginForm from "./Login/LoginForm";
// import RegisterForm from "./Register/RegisterForm";
// import { useState } from "react";
// import { FormTypes } from "./types/FormTypes";

// export default function UserAvatar() {
//   const [opened, { open, close }] = useDisclosure(false);
//   const [currentFormType, setCurrentFormType] = useState<FormTypes>(
//     FormTypes.LOGIN
//   );

//   return (
//     <div>
//       <button onClick={open}>
//         <p>Log in</p>
//       </button>

//       <Modal opened={opened} onClose={close} title="Log in.">
//         {
//           // show login or register form based on loginFormShowing
//           currentFormType === FormTypes.LOGIN ? (
//             <LoginForm setCurrentFormType={setCurrentFormType} />
//           ) : (
//             <RegisterForm setCurrentFormType={setCurrentFormType} />
//           )
//         }
//       </Modal>
//     </div>
//   );
// }

// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// import { app } from "../lib/firebase";

// export const SignUpAPI = async (data) => {
//   try {
//     const { email, password, name } = data;

//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     // Signed up successfully
//     const user = userCredential.user;

//     // You can do additional tasks here if needed

//     return user;
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//     // Handle errors appropriately
//     console.error("Sign up error:", errorCode, errorMessage);

//     // You can throw the error or return an error object based on your requirements
//     // throw error; // Uncomment this line if you want to throw the error
//     return { errorCode }; // Or return an error object
//   }
// };

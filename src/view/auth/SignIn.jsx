import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { Box, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import SignGoogle from "./SignGoogle";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../apis/AdminUserAPI";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";



function SignIn() {
  const navigate = useNavigate();
  const { currentUser, handleSignInContext } = useUserContext();
  const [error, setError] = useState(""); // State lưu trữ thông báo lỗi
  const { data: userList = [] } = useQuery({
    queryKey: ["userListSignIn"],
    queryFn: getUser,
  });


  const auth = getAuth();

  const signInSchema = object({
    email: string().required("Email cannot be blank").email("Email invalidate"),
    pass: string()
      .required("Password can not be blank")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must have at least 8 characters, 1 capital letter and 1 number"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      pass: "",
    },
    resolver: yupResolver(signInSchema),
    mode: "onTouched",
  });



  function checkSignin(value) {
    // Duyệt qua mảng các tài khoản


    for (let i = 0; i < userList.length; i++) {
      // Kiểm tra xem tài khoản và mật khẩu có khớp với bất kỳ mục nào trong mảng không


      if (userList[i].email.trim() === value.email.trim() && userList[i].pass.trim() === value.pass.trim()) {
        // Trả về true nếu tìm thấy khớp
        return true;
      }
    }
    // Trả về false nếu không tìm thấy khớp
    return false;
  }

  const handleSignInSubmit = (values) => {
    // signInWithEmailAndPassword(auth, values.email, values.password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log(user);

    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //     alert("Wrong email or password !");
    //   });

    const statusSignIn = checkSignin(values)


    console.log(statusSignIn)
    if (!statusSignIn) {
      setError("Sai tên đăng nhập hoặc mật khẩu!");
    } else {
      setError(""); // Xóa thông báo lỗi nếu xác thực thành công
      handleSignInContext(values)
      navigate("/")
    }


  };
  const handleGoogleSignInSuccess = () => {
    // Redirect to the home page when Google sign-up is successful
    navigate("/");
  };
  const SignUptosignup = () => {
    // Redirect to the home page when Google sign-up is successful
    navigate("/sign-up");
  };
  function handlePasswordReset() {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    alert("Email sent ! Check your inbox for password reset instructions.");
  }

  return (
    <div >
      <div className="bg-[#F3EEEA] h-[100dvh]">
        <div className="container mx-auto px-4 ">
          <h1 className="text-2xl text-center p-11 font-semibold text-[#776B5D]">
            Sign In
          </h1>
          <div className="flex justify-center items-center max-w-[60vw] mx-auto p-8 bg-[#EBE3D5] rounded-lg">
            <div className="">
              <div className=" inset-0 bg-white opacity-25 rounded-lg shadow-2xl"></div>
              <div className="bg-white rounded-lg shadow-2xl">
                <div className="bg-sign-house w-[350px] h-[260px] bg-center rounded-lg mb-10 shadow-xl transform origin-top hover:-rotate-45  transition duration-300"></div>
              </div>
            </div>
            <div className="w-[50%] text-center mx-6 ">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "80%" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(handleSignInSubmit)}
              >
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register("pass")}
                  error={!!errors.pass}
                  helperText={errors.pass?.message}
                />
                {error && (
                  <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                )}

                <p className="pl-[60px]" onClick={handlePasswordReset}>
                  Forgot Password?
                </p>

                <button
                  className=" w-[80%] h-[50px] bg-[#656565]  text-white  hover:bg-[#020202] rounded-lg duration-300 shadow hover:shadow-lg"
                  type="submit"
                >
                  Login
                </button>
              </Box>
              <button
                className=" w-[80%] h-[50px] mb-2 bg-[#656565]  text-white  hover:bg-[#020202] rounded-lg duration-300 shadow hover:shadow-lg"
                onClick={SignUptosignup}
              >
                Sign Up
              </button>
              <SignGoogle onGoogleSignInSuccess={handleGoogleSignInSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

import { Box, TextField } from "@mui/material";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  handleCloseNoti,
  handleOpenNoti,
} from "../../redux/features/modalNotiSlice";
import ModalNoti from "../components/modal/ModalNoti";
// import { createUserWithEmailAndPass, getAuth } from "firebase/auth";
import { handleSignIn } from "../../redux/features/userSlice";
import { app } from "../../lib/firebase";
import SignGoogle from "./SignGoogle";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "../../apis/AdminUserAPI";
import { useUserContext } from "../../context/UserContext";

function SignUp() {
  const { currentUser, handleSignInContext } = useUserContext();

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const auth = getAuth(app);
  const signupSchema = object({
    email: string().required("Email cannot be blank").email("Email invalidate"),
    pass: string()
      .required("Pass can not be blank")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Pass must have at least 8 characters, 1 capital letter and 1 number"
      ),
    checkPass: string()
      .required("Please confirm your pass")
      .test("pass-match", "Pass incorrect", function (value) {
        return value === this.parent.pass;
      }),
    birthday: string().required("Ngày sinh không được để trống"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      pass: "",
      checkPass: "",
      birthday: "",
    },

    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  // const onSubmit = (values) => {
  // createUserWithEmailAndPass(
  //   auth,
  //   values.email,
  //   values.pass,
  //   values.phone
  // )
  //   .then((userCredential) => {
  //     // Signed up
  //     const user = userCredential.user;
  //     // ...
  //     dispatch(handleSignIn(user));
  //     dispatch(
  //       handleOpenNoti({
  //         success: true,
  //         error: false,
  //         title: "Success!!!",
  //         secondTitle: "Go back to the main page...",
  //       })
  //     );
  //     setTimeout(() => {
  //       navigate("/");
  //       dispatch(handleCloseNoti());
  //     }, 2000);
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     console.log(errorCode);
  //     // ..
  //     dispatch(
  //       handleOpenNoti({
  //         success: false,
  //         error: true,
  //         title: "Email already exists",
  //         secondTitle: "Please change your email to another email",
  //       })
  //     );
  //   });
  // }; 




  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      console.log(values)
      const formValues = {
        email: values.email,
        pass: values.pass,
        birthday: values.birthday,
      };
      return addUser(formValues);
    },
    onSuccess: (data) => {
      console.log("thanh cong", data)
      handleSignInContext(data)
      navigate("/")
    },
    onError: (error) => {
      console.error("Lỗi khi thực hiện mutation:", error);
    },
  });




  const handleGoogleSignInSuccess = () => {
    // Redirect to the home page when Google sign-up is successful




    navigate("/");
  };

  const onError = (error) => {
    console.log(error);

    //Gọi API đăng kí
  };
  // const auth = getAuth(app);
  // console.log(auth.currentUser);
  return (
    <div className="bg-[#F3EEEA] h-[100dvh]" >
      <div className="container mx-auto px-4 ">
        <h1 className="text-2xl text-center p-11 font-semibold text-[#776B5D]">
          Sign Up
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
              onSubmit={handleSubmit(onSubmit)}
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
              <TextField
                name="checkPassword"
                label="Confirm password"
                type="password"
                variant="outlined"
                {...register("checkPass")}
                error={!!errors.checkPass}
                helperText={errors.checkPass?.message}
              />
              <TextField
                fullWidth
                type='date'
                variant="outlined"
                color="success"
                {...register("birthday")}
                error={!!errors.birthday}
                helperText={errors.birthday && errors.birthday.message}
              />
              <button
                className="h-[50px] bg-[#656565] text-white  hover:bg-[#020202] rounded-lg duration-300 shadow hover:shadow-lg "
                type="submit "
              >
                Sign up
              </button>
            </Box>
            <SignGoogle onGoogleSignInSuccess={handleGoogleSignInSuccess} />
          </div>
        </div>
        {/* <ModalNoti open={open} /> */}
      </div>
    </div>
  );
}

export default SignUp;





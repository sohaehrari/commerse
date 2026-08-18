import * as yup from "yup"


  export const loginSchema=yup.object({
    email: yup
    .string()
    .email("email is required")
    .required("please enter a valid email"),



    password: yup
    .string()
    .password("please enter your password")
    .min("password should be at least 6 characters")
    .required(" your password is required")
 });
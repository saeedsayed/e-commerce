import * as Yup from "yup";

// checkout form schema
export const checkoutFormSchema = Yup.object().shape({
  // contact information schema
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phoneNumber: Yup.string()
    .min(10, "Phone number is too short")
    .max(20, "Phone number is too long")
    .required("Phone number is required"),
  email: Yup.string().email().required(),
  // shipping address schema
  street: Yup.string().required(),
  country: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  ZIPCode: Yup.string().required(),
});

// login form schema
export const loginFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  rememberMe: Yup.boolean(),
});
// register form schema
export const registerFormSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
  accept: Yup.boolean().oneOf([true], "You must accept the terms"),
});
// forgot password form schema
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required(),
});
// verify OTP form schema
export const verifyOTPFormSchema = Yup.object().shape({
  otp: Yup.string().required(),
});
// reset password form schema
export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});
// profile form schema
export const profileFormSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  // userName: Yup.string().required(),
});

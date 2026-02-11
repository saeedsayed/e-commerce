import * as Yup from "yup";

// checkout form schema
export const checkoutFormSchema = Yup.object().shape({
  // contact information schema
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string()
    .min(10, "Phone number is too short")
    .max(20, "Phone number is too long")
    .required("Phone number is required"),
  email: Yup.string().email().required(),
  // shipping address schema
  street: Yup.string().required(),
  country: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  postalCode: Yup.string().required(),
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
    "Passwords must match",
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
    "Passwords must match",
  ),
});
// profile form schema
export const profileFormSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  // userName: Yup.string().required(),
});
// create user address schema
export const addressSchema = checkoutFormSchema.shape({
  // firstName: Yup.string()
  //   .required("The name is required")
  //   .min(2, "fullName must be at least 2 characters")
  //   .max(150),
  // fullName: Yup.string()
  //   .required("The name is required")
  //   .min(2, "fullName must be at least 2 characters")
  //   .max(150),
  // phone: Yup.string()
  //   .required("The phone number is required")
  //   .min(7, "phone must be valid"),
  // email: Yup.string()
  //   .required("The email is required")
  //   .email("email must be valid"),
  // street: Yup.string()
  //   .required("Street is required")
  //   .min(5, "address must be at least 5 characters"),
  // city: Yup.string()
  //   .required("city is required")
  //   .min(2, "city must be at least 2 characters"),
  // state: Yup.string().required("state is Required").trim(),
  // country: Yup.string().required("country is required"),
  // ZIPCode: Yup.string()
  //   .required("ZIP code is required")
  //   .min(2, "ZIP Code must be at least 2 characters"),
  title: Yup.string().trim().required("title is required"),
  isDefault: Yup.boolean(),
});

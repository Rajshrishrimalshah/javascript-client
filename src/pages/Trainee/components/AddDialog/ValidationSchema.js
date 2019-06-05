import * as yup from "yup";

 const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required field")
    .min(3),
  email: yup
    .string()
    .required("Email is a required field")
    .email('Email Address must be a valid email address'),
  password: yup
    .string()
    .required("Password is required field")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'must include at least one upper case letter, one lower case letter, and one numeric digit')
    .min(8),
  confirm_password: yup
    .string()
    .required("Password is required field")
    .min(8)
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

export default validationSchema;

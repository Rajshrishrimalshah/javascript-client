import * as yup from "yup";

 const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is a required field")
    .email('Email Address must be a valid email address'),
  password: yup
    .string()
    .required("Password is required field")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'must include at least one upper case letter, one lower case letter, and one numeric digit')
    .min(8),
});

export default validationSchema;

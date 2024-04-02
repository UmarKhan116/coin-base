import * as yup from 'yup'


const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const errorMessage = "use uppercase, lowercase and digits"

const signupSchema = yup.object().shape({
    name: yup.string().max(15).required("name is required"),
    username: yup.string().min(8).max(20).required(),
    email: yup.string().email('Enter a valid email').required(),
    password: yup.string().min(8).max(25).matches(passwordPattern, { message: errorMessage }).required(),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "password must match")

}) 

export default signupSchema;
import React, { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import signupSchema from "../../Schema/signupSchema";
import TextField from "../../component/textField/TextField";
import { useFormik } from "formik";
import { signup } from "../../api/internal";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";


function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [error, setError] = useState();

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
  });

  const handleSignup = async () => {
    debugger;
    const data = {
      username: values.username,
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    const response = await signup(data);
    if (response.status === 201) {
      const user = {
        _id: response.data.user.id,
        username: response.data.user.username,
        email: response.data.user.email,
        auth: response.data.auth,
      }
      dispatch(setUser(user))
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };
  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupHeader}>Create an account</div>
      <TextField
        placeholder="Enter name"
        value={values.name}
        type="text"
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />
      <TextField
        placeholder="Enter username"
        value={values.username}
        type="text"
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />
      <TextField
        placeholder="Enter email"
        value={values.email}
        type="text"
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.email}
      />
      <TextField
        placeholder="Enter password"
        value={values.password}
        type="password"
        name="password"
        onBlur={handleBlur}
        onChange={handleChange}
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
      <TextField
        placeholder="Confirm password"
        value={values.confirmPassword}
        type="password"
        name="confirmPassword"
        onBlur={handleBlur}
        onChange={handleChange}
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />
{error !== '' ? <p className={styles.errorMessage}>{error}</p> : ''}
      <button
        className={styles.signupButton}
        onClick={handleSignup}
        disabled={
          !values.username ||
          !values.password ||
          !values.name ||
          !values.confirmPassword ||
          !values.email ||
          errors.username ||
          errors.password ||
          errors.confirmPassword ||
          errors.name ||
          errors.email
        }
      >
        Sign Up
      </button>

      <span>
        Already have an account?{" "}
        <button className={styles.login} onClick={() => navigate("/login")}>
          Log In
        </button>
      </span>

      {/* {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""} */}
    </div>
  );
}

export default Signup;

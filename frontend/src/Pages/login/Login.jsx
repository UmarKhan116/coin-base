import React, { useState } from "react";
import TextField from "../../component/textField/TextField";
import styles from "./login.module.css";
import { useFormik } from "formik";
import loginSchema from "../../Schema/loginSchema";
import { login } from "../../api/internal";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {

  const [error,setError] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () =>{
    debugger
      const data = {
        Username: values.username,
        Password: values.password,
      }
      const res = await login(data)
  
  
      if(res.status === 200){
        debugger
        //set the state to redux store
        // redirect to login
  
        const user = {
          _id: res.data.user.id,
          username: res.data.user.username,
          email: res.data.user.email,
          auth: res.data.auth,
        }
        dispatch(setUser(user))
  
        navigate("/submitblog")
      }
      else if(res.code === "ERR_BAD_REQUEST"){
        setError(res.response.data.message)
      }
      
   
    
  }

const {values,touched,handleBlur,handleChange,errors} = useFormik({
  initialValues:{
    username:'',
    password:'',
  },
  validationSchema:loginSchema
})

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginHeader}>Login to your account</div>
      
      <TextField 
      type="text"
      value={values.username}
      name="username"
      placeholder="Enter username"
      onBlur={handleBlur}
      onChange={handleChange}
      error={errors.username && touched.username ? 1 : undefined}
      errormessage={errors.username}
      />
      <TextField 
      type="password"
      value={values.password}
      name="password"
      placeholder="Enter password"
      onBlur={handleBlur}
      onChange={handleChange}
      error={errors.password && touched.password ? 1 : undefined}
      errormessage={errors.password}
      />
      {error != '' ? <p className={styles.errorMessage}>{error}</p> : ''}
      <button disabled={!values.username || !values.password} className={styles.logInButton} onClick={handleLogin}>Log in</button>
      <span>Don't have an account ? <button className={styles.createAccount}>Register</button></span>
    </div>
  );
}

export default Login;

import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_INTERNAL_API_LINK,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export const login = async (data) => {
    let response;
  
    try {
      response = await api.post("/login", data);
    } catch (error) {
        console.error("API Request Error:", error);
        return error;
    }
  
    return response;
  };
  export const signup = async (data) =>{
    debugger
    let response;
    try {
      response = await api.post("/register", data);
        
    } catch (error) {
        console.error("API Request Error:", error);
        return error;
    }
    return response
  }

  export const logout = async () =>{
    let res;
    try {
      res = await api.post("/logout")
    } catch (error) {
      console.error(error)
      return error
      
    }
  }

  export const getAllBlogs = async () => {
    debugger
    let res;
    try {
      res = await api.get('/blog/all')
    } catch (error) {
      console.error(error)
    }
    return res;
  }

  export const createBlog = async (data) =>{
    debugger
    let response;
    try {
      response = await api.post('/blog', data)
    } catch (error) {
      console.error(error)
    }
    return response;
  }
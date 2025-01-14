import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {signOutUser} = useAuth();

    const axiosSecure = axios.create({
        baseURL: "https://bistro-boss-server-blush-mu.vercel.app",
    });

     // request interceptor to add authorization header for every secure call to the api 
  axiosSecure.interceptors.request.use(function (config){
    const token = localStorage.getItem("access-token")
    // console.log("request stopped by interceptors", token)
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // interceptors 401 and 403 status
  axiosSecure.interceptors.response.use(function(response){
    return response;
  }, async(error)=>{
    const status = error.response.status;
    console.log("status error in the interceptors", status)
    if(status === 401 || status === 403){
      await signOutUser();
      
      navigate("/login")
    }
    return Promise.reject(error);
  })

   
   
    return axiosSecure;
};

export default useAxiosSecure;



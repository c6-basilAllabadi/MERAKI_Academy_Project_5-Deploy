
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserId } from "../Redux/reducers/usersAuth";
import {
  setUserDetails,
  setAppliedJobs,
  setFavJobs,
  setFavJobsId,
  setAppliedJobsId
} from "../Redux/reducers/Users/users";
import { setUserName ,setImage} from "../Redux/reducers/Messenger/messenger";

import { useRef } from "react";
const LoginUser = () => {
  
  const login = (decoded1) => {
    axios
      .post("https://hire-me-kfab.onrender.com/login/users/googlelogin", {
        fullName: decoded1.name,
        email: decoded1.email,
        password: "0",
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setUserId(response.data.payload.userId));
        dispatch(setLogin(response.data.token));
        dispatch(setUserDetails(response.data.payload.user));
        navigate("/users/userhome");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const buttRef = useRef();
  const [signIn, setSignIn] = useState("Sign in");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInSucssfully, setLoggedInSucssfully] = useState(false);
  const [iserror, setIserror] = useState(false);
const [googleLogin,setGoogleLogin] = useState(false)
  const body = { email, password };

  const handleLogin = () => {
    axios
      .post("https://hire-me-kfab.onrender.com/login/users", body)
      .then((response) => {
        setLoggedInSucssfully(true);
        dispatch(setUserId(response.data.payload.userId));
        dispatch(setLogin(response.data.token));
        dispatch(setUserDetails(response.data.payload.user));
        dispatch(setUserName(response.data.payload.user.fullname));
        navigate("/users/userhome");
        getAllFavJobs(response.data.payload.userId);
        getAppliedJobJobs(response.data.payload.userId)
        dispatch(setImage(response.data.payload.user.userimage))
      })

      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      })
      .finally(() => {
        buttRef.current.disabled = false;
        buttRef.current.innerText = "Sign in";
      });
  };
  const getAppliedJobJobs = (userId1) => {
    axios
      .get(`https://hire-me-kfab.onrender.com/jobs/jobapply/${userId1}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(setAppliedJobs(result.data.result));
        dispatch(
          setAppliedJobsId(
            result.data.result.map((elm, idx) => {
              return elm.jobid;
            })
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllFavJobs = (userId1) => {
    axios
      .get(`https://hire-me-kfab.onrender.com/jobs/favjobs/${userId1}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(setFavJobs(result.data.result));
        dispatch(
          setFavJobsId(
            result.data.result.map((elm, idx) => {
              return elm.jobid;
            })
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="mainPageLoginUser">
        <div className="navbar_container2">
         
          <p
            className="navbar_user_login_link1"
            onClick={() => {
              navigate("/users/user/login");
            }}
          >
            Job Seeker Account
          </p>
          <p className="or">or</p>
          <p
            className="navbar_company_login_link1"
            onClick={() => {
              navigate("/companies/companies/login");
            }}
          >
            Employer Account
          </p>
        </div>
        <div className="BigDivLogin1">
          <div className="infoContainer1">
            <h1 style={{ textAlign: "left", marginBottom: "40px" }}>
              {" "}
              Job Seeker Account Login
            </h1>
            {/* <p> Email</p> */}
            <input
              className="emailInput1"
              placeholder=" Email "
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {/* <p> Password</p> */}
            <input
              type={"password"}
              className="emailInput1"
              placeholder=" Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {loggedInSucssfully && (
              <div className="popuptry1">
                <h1> Logged In Successfully</h1>
              </div>
            )}

            <button
              ref={buttRef}
              className="loginButton1"
              onClick={(e) => {
                buttRef.current.disabled = true;
                setTimeout(handleLogin, 1000);
               
                setSignIn(<i class="fa fa-circle-o-notch fa-spin"></i>);
              }}
            >
              {" "}
              {signIn}{" "}
            </button>
            
            <div className="popuptry1">
              
            <h2 style={{ color: "#3a3b3d" }}>{!iserror ? error : null}</h2></div>
            
          </div>
          
        </div>
        <div className="paragraph1">
          {" "}
          <span style={{ fontWeight: 600 }}>Job Seeker?</span>
          <p> Join Us and let employers find you easily and get hired now.</p>
          <span style={{ fontWeight: 600 }}>Build your profile</span>{" "}
        </div>
        <div className="belowLoginDiv1">
          <p
            className="registerLink1"
            onClick={() => {
              navigate("/users/user/register");
            }}
          >
            Dont Have Account! Register Now
          </p>
      

            </div>
            <p
            className="googleLink1"
            onClick={() => {
              setGoogleLogin(true)
            }}
          >
            LOGIN WITH GOOGLE
          </p>
          
        </div>
      
    </>
  );
};

export default LoginUser;

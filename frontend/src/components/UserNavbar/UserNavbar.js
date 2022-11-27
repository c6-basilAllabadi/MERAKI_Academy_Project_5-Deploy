import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../Redux/reducers/usersAuth/index";
import { useDispatch, useSelector } from "react-redux";
import JobsSearch from "../JobsSearch/JobsSearch.js";
import {
  setAppliedJobs,
  setFavJobs,
  setJobSearch,
} from "../Redux/reducers/Users/users.js";
import "./userNavbar.css"
const UserNavbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, jobSearch ,iscompleted,userDetails } = useSelector((state) => {
    return {
      isLoggedIn: state.usersAuth.isLoggedIn,
      jobSearch: state.users.jobSearch,
      iscompleted: state.users.userDetails.iscompleted,
      userDetails:state.users.userDetails
    };
  });

  const navigate = useNavigate();
  const axios = require("axios");
 
  return (
    <>
      <div className="userNavbar2 navMobile">
        <div className="home_navbar1">
          {isLoggedIn && (
            <p style={{color:"white"}}
              onClick={() => {
                navigate("/users/userhome");
                dispatch(setJobSearch(!jobSearch));
              }}
            >
              Home
            </p>
          )}

        </div>
        <div className="userDetails_navbar1 ">
        {isLoggedIn && (
          <p
            onClick={() => {
              navigate("/users/user/userdetails");
            }}
            className="navbar_company"
          >
            My Account
          </p>
        )}
        </div>
       

   
        <div className="favJobs_navbar">
        {isLoggedIn && (
          <p
            className="navbar_company"
            onClick={() => {
              navigate("/users/user/favjobs");
            }}
          >
            My Favorite Jobs
          </p>
        )}</div>
            <div className="complete_account_Navbar">
            {isLoggedIn && (iscompleted===1)&& (
          <p
            onClick={() => {
              navigate("/users/user/appliedjobs");
            }}
          >
            My Applied Jobs
          </p>
        )}
        {isLoggedIn && (iscompleted===0)&& (
          <p style={{color:"#eb2f06"}}
            onClick={() => {
              navigate("/users/user/complete");
            }}
          >
            Complete My Account
          </p>

        )}
        </div>
        <div className="applyJobs_navbar">
       </div>
     
        <div className="search_navbar1">
         {isLoggedIn && <JobsSearch />}
         </div>
         <div>
        {isLoggedIn && (
          <p
            onClick={() => {
              navigate("/messenger");
            }}
          >
            messages
          </p>
        )}</div>
         <div className="logout">
        {isLoggedIn && (
          <p
            onClick={() => {
              dispatch(setLogout());
              navigate("/users/user/login");
              dispatch(setAppliedJobs([]));
              dispatch(setFavJobs([]));
            }}
          >
            Logout
          </p>
        )}</div>
     
        {isLoggedIn&&(<h4 style={{textdecoration:"none",color:"#eb2f06",hover:"none"}}>Welcome Back {userDetails.fullname} </h4>)}

      </div>
    </>
  );
};

export default UserNavbar;

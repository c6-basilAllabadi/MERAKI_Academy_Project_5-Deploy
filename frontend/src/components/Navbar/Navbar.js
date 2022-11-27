import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => {
    return { isLoggedIn: state.usersAuth.isLoggedIn };
  });

  const navigate = useNavigate();
  const axios = require("axios");

  return (
    <>
      <div className="navbar_mainpage">
        <div className="navbar_container1">
          <p
            className="navbar_user_login_link"
            onClick={() => {
              navigate("/users/user/login");
            }}
          >
            Job Seeker Account
          </p>
          <p className="or">or</p>
          <p
            className="navbar_company_login_link"
            onClick={() => {
              navigate("/companies/companies/login");
            }}
          >
            Employer Account
          </p>
        </div>
        <div className="middle_word">
          Jobs In Jordan
        </div>
        <div className="middle_navigater">
          <div
            className="jobSeekerDiv"
            onClick={() => {
              navigate("/users/user/login");
            }}
          >
            <img src="https://cloudfront.tanqeeb.com/tanqeeb_2020/img/home-icon-2.svg"></img>
            <div className="jobSeekerDivParaghraph">
              <span style={{ fontWeight: 600 }}>Job Seeker?</span>
              <p>
                {" "}
                Join Us and let employers find you easily and get hired now.
              </p>
              <span style={{ fontWeight: 600 }}>
                Build your profile   <i class="fas fa-arrow-right"></i>
              </span>
            </div>
          </div>
          <div
            className="employerDiv"
            onClick={() => {
              navigate("/companies/companies/login");
            }}
          >
            <img src="https://cloudfront.tanqeeb.com/tanqeeb_2020/img/home-icon-1.svg"></img>
            <div className="employerDivPharagraph">
              <span style={{ fontWeight: 600 }}>Employer?</span>
              <p>Hire the perfect talent from many available candidate.</p>
              <span style={{ fontWeight: 600 }}>
                Post a Job <i class="fas fa-arrow-right"></i>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

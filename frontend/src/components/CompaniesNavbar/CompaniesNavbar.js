import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLogout } from "../Redux/reducers/CompaniesAuth/index";
import { useDispatch, useSelector } from "react-redux";
import "./CompaniesNavbar.css";
import { setAllUsers } from "../Redux/reducers/Companies/companies.js";
const CompaniesNavbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, companyDetails } = useSelector((state) => {
    return {
      isLoggedIn: state.CompaniesAuth.isLoggedIn,
      companyDetails: state.companies.companyDetails,
    };
  });

  const navigate = useNavigate();

  const getAllUsers = () => {
    axios
      .get("https://hire-me-kfab.onrender.com/users")
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(setAllUsers(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="companies_navbar">
        {isLoggedIn && (
          <p
            onClick={() => {
              navigate("/companies/companieshome");
              getAllUsers();
            }}
          >
            Home
          </p>
        )}

        {isLoggedIn && (
          <p
            className="navbar_company"
            onClick={() => {
              navigate("/companies/company/companydetails");
            }}
          >
            My Account
          </p>
        )}
        {isLoggedIn && (
          <p
            onClick={() => {
              navigate("/companies/companyjobs");
            }}
          >
            My Jobs
          </p>
        )}
        {isLoggedIn && (
          <p
            onClick={() => {
              navigate("/companies/favusers");
            }}
          >
            {" "}
            My Favorite Users
          </p>
        )}
        {isLoggedIn && (
          <p
            onClick={() => {
              navigate("/companies/company/appliedjobs");
            }}
          >
            Jobs Applications
          </p>
        )}

        {isLoggedIn && (
          <p
            onClick={() => {
              navigate("/messenger");
            }}
          >
            messages
          </p>
        )}
        {isLoggedIn && (
          <p
            onClick={() => {
              dispatch(setLogout());
              navigate("/companies/companies/login");
            }}
          >
            Logout
          </p>
        )}
        {isLoggedIn && (
          <h4
            style={{ textdecoration: "none", color: "#eb2f06", hover: "none" }}
          >
            Welcome Back {companyDetails.companyname}{" "}
          </h4>
        )}
      </div>
    </>
  );
};

export default CompaniesNavbar;

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CompaniesNavbar from "../CompaniesNavbar/CompaniesNavbar";
import {setUserCoId} from "../Redux/reducers/Companies/companies"
import "./UserDetailsCompanyApp.css"
import Footer from "../Footer/Footer";
function UserDetailsCompanyApp() {


  const dispatch =useDispatch()
  const navigate=useNavigate()

  const { userDetailsInCompanyApp } = useSelector((state) => {
    return {
      userDetailsInCompanyApp: state.companies.userDetailsInCompanyApp,
    };
  });

  return (
    <>
         <CompaniesNavbar/>
         <div className="userDetailsMainDiv3">
        <div className="userDetailsCard3">
          <div className="profilePicture">
            <img src={userDetailsInCompanyApp.userimage}></img>
            {userDetailsInCompanyApp.cv && (
              <a href={userDetailsInCompanyApp.cv} target="blank" download>
                <button style={{color:"white"}}>Download CV</button>
              </a>
            )}
           
          </div>
          <div className="personalInfo">
            <h3>Personal Information</h3>
            <p><span style={{ fontWeight: "600" }}>Full Name :</span>{userDetailsInCompanyApp.fullname}</p>
            <p><span style={{ fontWeight: "600" }}>Date Of Birth :</span>{userDetailsInCompanyApp.dateofbirth.substring(0, 10)}</p>
            <p><span style={{ fontWeight: "600" }}>Gender :</span>{userDetailsInCompanyApp.gender}</p>
            <p><span style={{ fontWeight: "600" }}>Phone Number :</span>{userDetailsInCompanyApp.phonenumber}</p>
            <p><span style={{ fontWeight: "600" }}>Address :</span>{userDetailsInCompanyApp.wheredoyoulive}</p>
            <p><span style={{ fontWeight: "600" }}>Citizenship : </span>{userDetailsInCompanyApp.citizenships}</p>
            <p><span style={{ fontWeight: "600" }}>Material Status :</span>{userDetailsInCompanyApp.maritalstatus}</p>
            <p><span style={{ fontWeight: "600" }}>Languages :</span>{userDetailsInCompanyApp.languages}</p>
          </div>
          <div className="professionalInfo">
            <h3>Professional Information</h3>
            <p><span style={{ fontWeight: "600" }}>Recent Job Function :</span>{userDetailsInCompanyApp.recentjobfunction}</p>
            <p><span style={{ fontWeight: "600" }}>Recent Job Title :</span>{userDetailsInCompanyApp.recentjobtitle}</p>
            <p><span style={{ fontWeight: "600" }}>Years Of Experience :</span>{userDetailsInCompanyApp.yearsofexperience}</p>
            <p><span style={{ fontWeight: "600" }}>Skills :</span>{userDetailsInCompanyApp.skills}</p>
            <h3>Educational Information</h3>
            <p><span style={{ fontWeight: "600" }}>Major :</span>{userDetailsInCompanyApp.major}</p>
            <p>
            <span style={{ fontWeight: "600" }}>Educational Institute Name :</span>{userDetailsInCompanyApp.educationalinstitutename}
            </p>
          </div>
        </div>
        <button onClick={()=>{
dispatch(setUserCoId(userDetailsInCompanyApp.id))
navigate("/messenger")
    }}> Send Message</button>
      
        </div>
        <div className="Footer_user">
      <Footer/>
      </div>
    </>
  );
}

export default UserDetailsCompanyApp;

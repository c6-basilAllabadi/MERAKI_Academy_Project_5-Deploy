import axios from "axios";
import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setCompanyAppliedJobs } from "../Redux/reducers/Companies/companies";
import "./CompaniesAppliedJobs.css"
import CompaniesNavbar from "../CompaniesNavbar/CompaniesNavbar";
import Footer from "../Footer/Footer";

const CompaniesAppliedJobs = () => {
  const dispatch = useDispatch();
  const { companyId, companyAppliedJobs } = useSelector((state) => {
    return {
      companyId: state.CompaniesAuth.companyId,
      companyAppliedJobs: state.companies.companyAppliedJobs,
    };
  });

  const getCompaniesAppliedJobs = () => {
    axios
      .get(`https://hire-me-kfab.onrender.com/jobs/jobapplies/${companyId}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(setCompanyAppliedJobs(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompaniesAppliedJobs();
  });
  return (
    <>
   <CompaniesNavbar/>
      <div className="jobApplicationMainPage">
      {!companyAppliedJobs.length&& <div className="empety">
      <img alt = "empty_jobs" src="https://res.cloudinary.com/dfpuepvtg/image/upload/v1668974149/no_kxgfhk.png" />
      <h1> There is no incoming applications yet</h1>
      
      </div>}
        {companyAppliedJobs &&
          companyAppliedJobs.map((elem, index) => {
            return (
              <div className="jobApplication">
                 <div className="jobApplicationCard">
    
              <div className="profilePicture">
                <img alt = "empty_jobs" src={elem.userimage}></img>
                <a href={elem.cv} download target="blank"><button>Download CV</button></a>
              </div>
              <div className="personalInfo">
            <h3>Personal Information</h3>
            <p><span style={{ fontWeight: "600" }}>Full Name :</span>{elem.fullname}</p>
            <p><span style={{ fontWeight: "600" }}>Date Of Birth :</span>{elem.dateofbirth.substring(0, 10)}</p>
            <p><span style={{ fontWeight: "600" }}>Gender :</span>{elem.gender}</p>
            <p><span style={{ fontWeight: "600" }}>Phone Number :</span>{elem.phonenumber}</p>
            <p><span style={{ fontWeight: "600" }}>Address :</span>{elem.wheredoyoulive}</p>
            <p><span style={{ fontWeight: "600" }}>Citizenship : </span>{elem.citizenships}</p>
            <p><span style={{ fontWeight: "600" }}>Material Status :</span>{elem.maritalstatus}</p>
            <p><span style={{ fontWeight: "600" }}>Languages :</span>{elem.languages}</p>
          </div>
          <div className="professionalInfo">
            <h3>Professional Information</h3>
            <p><span style={{ fontWeight: "600" }}>Recent Job Function :</span>{elem.recentjobfunction}</p>
            <p><span style={{ fontWeight: "600" }}>Recent Job Title :</span>{elem.recentjobtitle}</p>
            <p><span style={{ fontWeight: "600" }}>Years Of Experience :</span>{elem.yearsofexperience}</p>
            <p><span style={{ fontWeight: "600" }}>Skills :</span>{elem.skills}</p>
            <h3>Educational Information</h3>
            <p><span style={{ fontWeight: "600" }}>Major :</span>{elem.major}</p>
            <p>
            <span style={{ fontWeight: "600" }}>Educational Institute Name :</span>{elem.educationalinstitutename}
            </p>
          </div>
      </div>
      <h2 style={{marginLeft:"500px"}}>Job Details</h2>
      <div id={elem.id} key={elem.id} className="jobCardDetailsApplied">
   
       <div className="generalInfoApplied">
        <div>
        <p style={{ fontWeight: "600" }}>Job Title :</p><p className="jobTitleCardDetails">
           {elem.jobtitle}
        </p>
        </div>
         <div>
           <p style={{ fontWeight: "600" }}>Job Location:</p>
           <p>{elem.joblocation}</p>
         </div>
         <div>
           {" "}
           <p style={{ fontWeight: "600" }}>Job Type:</p>{" "}
           <p>{elem.jobtype}</p>
         </div>
         <div>
           {" "}
           <p style={{ fontWeight: "600" }}>Job Role:</p>
           <p>{elem.jobrole}</p>
         </div>
         <div>
           <p style={{ fontWeight: "600" }}>Career Level: </p>
           <p>{elem.careerlevel}</p>
         </div>
         <div>
           <p style={{ fontWeight: "600" }}>Date Posted:</p>
           <p>{elem.createdat.substring(0, 10)}</p>
         </div>
         <div>
         <p style={{ fontWeight: "600" }}>Expiry Date: </p>
         <p>{elem.expirydate.substring(0, 10)}</p>
      </div>
       <div>
             <p style={{ fontWeight: "600" }}>Years Of Experience</p>
             <p>{elem.yearsofexperience}</p>
           </div>
           <div>
             {" "}
             <p style={{ fontWeight: "600" }}>Country Of Citizenship</p>
             <p>{elem.countryofcitizenship}</p>
           </div>
           <div>
             {" "}
             <p style={{ fontWeight: "600" }}>Country Of Residence</p>
             <p>{elem.countryofresidence}</p>
           </div>
           <div>
             <p style={{ fontWeight: "600" }}>Languages</p>
             <p>{elem.language}</p>
           </div>
           <div>
             <p style={{ fontWeight: "600" }}>Salary</p>
             <p>{elem.salary}</p>
           </div></div> 
       <div className="jobDetailsInfoApplied">
       
         <br></br>
         <p style={{ fontWeight: "600" }}>Job Description</p>{" "}
         <p className="jobDescriptionDetails">{elem.jobdescription}</p>
         <br></br>
         <p style={{ fontWeight: "600" }}>Job Requirements</p>
         <p>{elem.jobrequirements}</p>
         <br></br>
         
         </div>
      
    
      </div>
      
      </div>
      
      

              
     
            
        
         
         
            );
          })}
          <div style={{marginLeft:"700px",marginBottom:"50px"}}> 
          <button className="addFavCard1" onClick={()=>{
       
       window.print(); 
     
    }}> Print All Applications</button></div>
      <div className="Footer_user">
      <Footer/>
      </div>
      </div>

    </>
  );
};

export default CompaniesAppliedJobs;

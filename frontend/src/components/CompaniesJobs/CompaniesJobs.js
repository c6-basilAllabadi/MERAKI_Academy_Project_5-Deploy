import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CompaniesNavbar from "../CompaniesNavbar/CompaniesNavbar";
import {
  setCompanyJobs,
  deleteJobs,
  setJobDetails,
  updateJob
} from "../Redux/reducers/Companies/companies";
import "./CompaniesJobs.css"
import Footer from "../Footer/Footer";
const CompaniesJobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { companyId, companyJobs,token } = useSelector((state) => {
    return {
      companyId: state.CompaniesAuth.companyId,
      companyJobs: state.companies.companyJobs,
      token:state.CompaniesAuth.token
    };
  });
  const [jobTitle, setJobTitle] = useState(null);
  const [expiryDate, setExpiryDate] = useState(null);
  const [jobLocation, setJobLocation] = useState(null);
  const [careerLevel, setCareerLevel] = useState(null);
  const [jobType, setJobType] = useState(null);
  const [jobRole, setJobRole] = useState(null);
  const [yearsOfExperience, setYearsOfExperience] = useState(null);
  const [countryOfCitizenship, setCountryOfCitizenship] = useState(null);
  const [countryOfResidence, setCountryOfResidence] = useState(null);
  const [salary, setSalary] = useState(null);
  const [numberOfHires, setNumberOfHires] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [language, setLanguage] = useState(null);
  const [jobRequirements, setJobRequirements] = useState(null);
  const [jobUpdateId, setJobUpdateId] = useState("");
  const [updateBox, setUpdateBox] = useState(false);

  const getCompanyJobs = () => {
    axios
      .get(`https://hire-me-kfab.onrender.com/jobs/${companyId}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(setCompanyJobs(result.data.result));
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteJob = (jobId) => {
    axios
      .delete(`https://hire-me-kfab.onrender.com/jobs/${jobId}`,{
        headers: {
          authorization: "Bearer " + token,
        }})
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(deleteJobs(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const body = {
    jobTitle,
    expiryDate,
    jobLocation,
    careerLevel,
    jobType,
    jobRole,
    yearsOfExperience,
    countryOfCitizenship,
    countryOfResidence,
    salary,
    numberOfHires,
    jobDescription,
    language,
    jobRequirements,
  };
  const handleUpdateClick = (job) => {
    setUpdateBox(!updateBox);
    setJobUpdateId(job.id);
    if (updateBox) updateJob1(job.id);
  };
  const updateJob1 = () => {
    axios
      .put(`https://hire-me-kfab.onrender.com/jobs/${jobUpdateId}`,body,{
        headers: {
          authorization: "Bearer " + token,
        }})
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(updateJob({jobUpdateId:jobUpdateId,updatedJob:result.data.result}))
       
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCompanyJobs();
  }, []);

  return (
    <>
    <CompaniesNavbar/>
    <div className="companiesJobsDiv">
      <div className="jobsCardsComapniesDiv">

      {!companyJobs.length&& <div className="empety">
      <img src="https://res.cloudinary.com/dfpuepvtg/image/upload/v1668974149/no_kxgfhk.png" />
      <h1> Add New Job NOW !</h1>
      </div>}
        {companyJobs && companyJobs.map((elem, index) => {
            return (
              <div id={elem.id} key={index} className="jobCard">
              <img className="companyLogoCard" src={elem.companylogo}></img>
              <h2 className="jobTitleCard" onClick={()=>{
                dispatch(setJobDetails(elem))
                navigate("/companies/jobdetails");
              }}>{elem.jobtitle}</h2>
              <h4 className="companyNameCard" onClick={()=>{
               
              }}>{elem.companyname} - {elem.industry} - {elem.country}</h4>
              
              
              <p className="carerLevelCard">Career Level : {elem.careerlevel}</p>
              <p></p>
              <p className="createdDateCard" style={{fontSize:"12px"}} >Date Posted :{elem && elem.createdat.substring(0,10)}</p>
              <p className="expiryDateCard" style={{fontSize:"12px"}}>Expiry Date: {elem && elem.expirydate.substring(0,10)}</p>
              <p className="jobDescription">{elem && elem.jobdescription.substring(0,150)}...</p></div>

            );
          })}
          <button  style={{marginLeft:"400px"}}className ="addFavCard" onClick={() => {
              navigate("/companies/addnewjob");
            }}>  
           
            Add New Job
          </button>
      </div>
      
      <div className="video3">
      
      <video  style={{width:"400px"}} autoplay="true" muted="true" playsinline="true" loop="true" >
    <source src="https://www.freshresume.co/video/Freshresume_t1_new.mp4" type="video/mp4"/>
  </video>
  <h1>Create a winning<br></br>
    portfolio in minutes..</h1>
   
    <a href="https://portfolio.adobe.com/start" target="blank"><button className="createCvButton1" >Create Your Portfolio</button></a>
      </div>
      <div className="Footer_user">
      <Footer/>
      </div>
      </div>
    </>
  );
};

export default CompaniesJobs;

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserNavbar from "../UserNavbar/UserNavbar";
import "../UserAppliedJobs/UserAppliedJobs.css"
import Footer from "../Footer/Footer";
import {

  setJobDetails,
  setCompanyDetailsInUsersApp,
  setAppliedJobs,deleteAppliedJobs, deleteAppliedJobsId
} from "../Redux/reducers/Users/users";
function UserAppliedJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, appliedJobs,token } = useSelector((state) => {
    return {
      userId: state.usersAuth.userId,
      appliedJobs: state.users.appliedJobs,
      token:state.usersAuth.token
    };
  });

  const getAppliedJobJobs = () => {
    axios
      .get(`https://hire-me-kfab.onrender.com/jobs/jobapply/${userId}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(setAppliedJobs(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAppliedJobJobs();
  }, []);

  const deleteAppliedJob1 = (appliedJobId) => {
    axios
      .delete(`https://hire-me-kfab.onrender.com/jobs/jobapply/${appliedJobId}`,{
        headers: {
          authorization: "Bearer " + token,
        }})
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
       <UserNavbar/>
     
       <div className="favHomeDiv1">
      <div className="favjobsCardsDiv1">
      {!appliedJobs.length&& <div className="empety">
      <img src="https://res.cloudinary.com/dfpuepvtg/image/upload/v1668974149/no_kxgfhk.png" />
      <h1> Browse Jobs NOW !</h1>
      <button className="button1" onClick={()=>{navigate('/users/userhome')}} > Browse Jobs now!  </button>
      </div>}
        {appliedJobs &&
          appliedJobs.map((elem, index) => { return(
            <div id={elem.id} key={index} className="favjobCard1">
            <img className="companyLogoCard1" src={elem.companylogo}></img>
            <h2 className="jobTitleCard1" onClick={()=>{
              dispatch(setJobDetails(elem))
              navigate('/users/jobdetails')
            }}>{elem.jobtitle}</h2>
            <h4 className="companyNameCard1" onClick={()=>{
              dispatch(setCompanyDetailsInUsersApp(elem))
              navigate('/users/companydetails/userapp')
            }}>{elem.companyname} - {elem.industry} - {elem.country}</h4>
            
            
            <p className="carerLevelCard1">Career Level : {elem.careerlevel}</p>
            <p></p>
            <p className="createdDateCard" style={{fontSize:"12px"}} >Date Posted :{elem.createdat.substring(0,10)}</p>
            <p className="expiryDateCard" style={{fontSize:"12px"}}>Expiry Date: {elem.expirydate.substring(0,10)}</p>
            <p className="jobDescription1">{elem.jobdescription.substring(0,150)}...</p>
                <button className="deleteFavButton1"
                  onClick={() => {
                    deleteAppliedJob1(elem.id)
                    dispatch(deleteAppliedJobs(elem.id));
                    dispatch(deleteAppliedJobsId(elem.jobid))
                    
                  }}
                >
                  {" "}
                  Delete Application
                </button>
              </div>
            );
          })}
      </div>
      <div className="video2">
      
      <video  style={{width:"400px"}} autoplay="true" muted="true" playsinline="true" loop="true" >
    <source src="https://www.freshresume.co/video/Freshresume_t1_new.mp4" type="video/mp4"/>
  </video>
  <h1>Create a winning<br></br>
    resume in minutes..</h1>
   
    <a href="https://www.freshresume.co/info/63754103e4e84dce557bca1e" target="blank"><button className="createCvButton" >Create Your Resume</button></a>
      </div>
      <div className="Footer_user">
      <Footer/>
      </div>
      </div>
    </>
  );
}
export default UserAppliedJobs;

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserNavbar from "../UserNavbar/UserNavbar";
import "../JobDetailsUsers/JobDetailsUsers.css";
import Footer from "../Footer/Footer";
import {addAppliedJobsId, addFavJobsId} from "../../components/Redux/reducers/Users/users"
function JobDetailsUsers() {
  const { jobDetails, userId, token ,iscompleted,favJobsId,appliedJobsId} = useSelector((state) => {
    return {
      jobDetails: state.users.jobDetails,
      userId: state.usersAuth.userId,
      token : state.usersAuth.token,
      iscompleted: state.users.userDetails.iscompleted,
      favJobsId:state.users.favJobsId,
      appliedJobsId:state.users.appliedJobsId
    };
  });
  const dispatch=useDispatch()
  const jobApply = () => {
    axios
      .post(`https://hire-me-kfab.onrender.com/jobs/jobapply/${userId}`, {
        jobId: jobDetails.id},{headers: {
          authorization: "Bearer " + token
        }})
      .then((result) => {
        console.log(result);
        console.log(appliedJobsId)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddToFav = (jobId) => {
    axios
      .post(`https://hire-me-kfab.onrender.com/jobs/favjobs/${userId}`,{jobId},{headers: {
        authorization: "Bearer " + token
      }})
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    {  console.log(appliedJobsId)}
      <UserNavbar />
      {console.log(jobDetails)}
      <div className="jobDetailsMainPage2">
        <div id={jobDetails.id} key={jobDetails.id} className="jobCardDetails2">
          <div className="generalInfo">
            <img
              className="companyLogoCardDetails2"
              src={jobDetails.companylogo}
            ></img>
            <div>
              <p style={{ fontWeight: "600" }}>Company:</p>{" "}
              <p onClick={() => {}}>{jobDetails.companyname}</p>
            </div>

            <div>
              <p style={{ fontWeight: "600" }}>Industry:</p>
              <p>{jobDetails.industry}</p>{" "}
            </div>
            <div>
              <p style={{ fontWeight: "600" }}>Job Location:</p>
              <p>{jobDetails.joblocation}</p>
            </div>
            <div>
              {" "}
              <p style={{ fontWeight: "600" }}>Job Type:</p>{" "}
              <p>{jobDetails.jobtype}</p>
            </div>
            <div>
              {" "}
              <p style={{ fontWeight: "600" }}>Job Role:</p>
              <p>{jobDetails.jobrole}</p>
            </div>
            <div><p style={{ fontWeight: "600" }}>Career Level: </p><p>
              {jobDetails.careerlevel}
            </p></div>
            <div>
              <p style={{ fontWeight: "600" }}>Date Posted:</p>
              <p>{jobDetails.createdat.substring(0, 10)}</p>
            </div>
            <p style={{ fontWeight: "600" }}>Expiry Date: </p>
            <p>{jobDetails.expirydate.substring(0, 10)}</p>
          </div>
          <div className="jobDetailsInfo">
            
            <h2 className="jobTitleCardDetails" onClick={() => {}}>
              {jobDetails.jobtitle} 
            </h2> <br></br>
            <p style={{ fontWeight: "600" }}>Job Description</p> <p className="jobDescriptionDetails">{jobDetails.jobdescription}</p><br></br>
            <p style={{ fontWeight: "600" }}>Job Requirements</p><p>{jobDetails.jobrequirements}</p><br></br>
            <div className="additionalInfo">
              <div>
            <p style={{ fontWeight: "600" }}>Years Of Experience</p><p>{jobDetails.yearsofexperience}</p></div>
            <div> <p style={{ fontWeight: "600" }}>Country Of Citizenship</p><p>{jobDetails.countryofcitizenship}</p></div>
            <div> <p style={{ fontWeight: "600" }}>Country Of Residence</p><p>{jobDetails.countryofresidence}</p></div>
            <div><p style={{ fontWeight: "600" }}>Languages</p><p>{jobDetails.language}</p></div>
            <div><p style={{ fontWeight: "600" }}>Company Number Of Hires</p><p>{jobDetails.numberofhires}</p></div>
            <div><p style={{ fontWeight: "600" }}>Salary</p><p>{jobDetails.salary}</p></div>
            
            </div>
            {Boolean(iscompleted)&&(!appliedJobsId.includes(jobDetails.id))&&<button className="applyButton2"
            onClick={() => {
              jobApply();
              dispatch(addAppliedJobsId(jobDetails.id))
            }}
          >
            Apply For This Job
          </button>}
          {Boolean(iscompleted)&&(appliedJobsId.includes(jobDetails.id))&&<button className="applyButton2"
            
          >
            Applied
          </button>}
          {!favJobsId.includes(jobDetails.id)&& <button
                    className="addFavCard"
                    onClick={(e) => {
                      handleAddToFav(jobDetails.id);
                      dispatch(addFavJobsId(jobDetails.id))
                     
                    }}
                  >
                   Add to Favorite
                  </button>}
                  {favJobsId.includes(jobDetails.id)&& <button
                    className="addFavCard"
                   
                  >
                   Added to Favorite
                  </button>}
            <p></p>{" "}
          </div>

        
        </div>
        <div className="Footer_user">
      <Footer/>
      </div>
      </div>
   
    </>
  );
}

export default JobDetailsUsers;

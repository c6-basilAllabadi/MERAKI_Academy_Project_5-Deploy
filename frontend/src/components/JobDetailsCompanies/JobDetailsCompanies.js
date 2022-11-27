import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CompaniesNavbar from "../CompaniesNavbar/CompaniesNavbar";
import {
  setCompanyJobs,
  deleteJobs,
  setJobDetails,
  updateJob,
} from "../Redux/reducers/Companies/companies";
import "./JobDetailsCompanies.css";

function JobDetailsCompanies() {
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
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
  const navigate = useNavigate();
  const { jobDetails, token } = useSelector((state) => {
    return {
      jobDetails: state.companies.jobDetails,
      token: state.CompaniesAuth.token,
    };
  });
  const deleteJob = (jobId) => {
    axios
      .delete(`https://hire-me-kfab.onrender.com/jobs/${jobId}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(deleteJobs(result.data.result));
        setDeleted(true);

        setTimeout(() => {
          navigate("/companies/companyjobs");
        }, 1000);
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
      .put(`https://hire-me-kfab.onrender.com/jobs/${jobUpdateId}`, body, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(
          updateJob({
            jobUpdateId: jobUpdateId,
            updatedJob: result.data.result,
          })
        );
        dispatch(setJobDetails(result.data.result))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CompaniesNavbar />
      <div className="jobDetailsMainPage3">
        <div id={jobDetails.id} key={jobDetails.id} className="jobCardDetails3">
          <div className="generalInfo">
            <img
              className="companyLogoCardDetails3"
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
            <div>
              <p style={{ fontWeight: "600" }}>Career Level: </p>
              <p>{jobDetails.careerlevel}</p>
            </div>
            <div>
              <p style={{ fontWeight: "600" }}>Date Posted:</p>
              <p>{jobDetails.createdat.substring(0, 10)}</p>
            </div>
            <p style={{ fontWeight: "600" }}>Expiry Date: </p>
            <p>{jobDetails.expirydate.substring(0, 10)}</p>
          </div>
          <div className="jobDetailsInfo3">
            <h2 className="jobTitleCardDetails3" onClick={() => {}}>
              {jobDetails.jobtitle}
            </h2>{" "}
            <br></br>
            <p style={{ fontWeight: "600" }}>Job Description</p>{" "}
            <p className="jobDescriptionDetails3">
              {jobDetails.jobdescription}
            </p>
            <br></br>
            <p style={{ fontWeight: "600" }}>Job Requirements</p>
            <p>{jobDetails.jobrequirements}</p>
            <br></br>
            <div className="additionalInfo3">
              <div>
                <p style={{ fontWeight: "600" }}>Years Of Experience</p>
                <p>{jobDetails.yearsofexperience}</p>
              </div>
              <div>
                {" "}
                <p style={{ fontWeight: "600" }}>Country Of Citizenship</p>
                <p>{jobDetails.countryofcitizenship}</p>
              </div>
              <div>
                {" "}
                <p style={{ fontWeight: "600" }}>Country Of Residence</p>
                <p>{jobDetails.countryofresidence}</p>
              </div>
              <div>
                <p style={{ fontWeight: "600" }}>Languages</p>
                <p>{jobDetails.language}</p>
              </div>
              <div>
                <p style={{ fontWeight: "600" }}>Company Number Of Hires</p>
                <p>{jobDetails.numberofhires}</p>
              </div>
              <div>
                <p style={{ fontWeight: "600" }}>Salary</p>
                <p>{jobDetails.salary}</p>
              </div>
              <button
                onClick={() => {
                  handleUpdateClick(jobDetails);
                }}
              >
                Update Job
              </button>
              <button
                onClick={() => {
                  deleteJob(jobDetails.id);
                }}
              >
                Delete Job
              </button>
            </div>
            <p></p>{" "}
            {deleted && <p> Job Deleted Successfully</p>}
          </div>
        </div>

        {updateBox && jobUpdateId === jobDetails.id && (
          <div>
            <h1>Update Any Field You Want !</h1>
            <div className="updateSectionDetailsCompany">
              <input
                type="text"
                placeholder="job title here"
                onChange={(e) => setJobTitle(e.target.value)}
              />

              <input
                placeholder="expiry date here"
                onChange={(e) => setExpiryDate(e.target.value)}
              ></input>

              <input
                placeholder="job location here"
                onChange={(e) => setJobLocation(e.target.value)}
              ></input>

              <input
                placeholder="career level here"
                onChange={(e) => setCareerLevel(e.target.value)}
              ></input>

              <input
                placeholder="job type here"
                onChange={(e) => setJobType(e.target.value)}
              ></input>

              <input
                placeholder="job role here"
                onChange={(e) => setJobRole(e.target.value)}
              ></input>
              <input
                placeholder="years of experience here"
                onChange={(e) => setYearsOfExperience(e.target.value)}
              ></input>
              <input
                placeholder="country of citizenship here"
                onChange={(e) => setCountryOfCitizenship(e.target.value)}
              ></input>
              <input
                placeholder="country of residence here"
                onChange={(e) => setCountryOfResidence(e.target.value)}
              ></input>
              <input
                placeholder="salary here"
                onChange={(e) => setSalary(e.target.value)}
              ></input>
              <input
                placeholder="number of hires here"
                onChange={(e) => setNumberOfHires(e.target.value)}
              ></input>
              <input
                placeholder="job description here"
                onChange={(e) => setJobDescription(e.target.value)}
              ></input>
              <input
                placeholder="language here"
                onChange={(e) => setLanguage(e.target.value)}
              ></input>
              <input
                placeholder="job requirements here"
                onChange={(e) => setJobRequirements(e.target.value)}
              ></input>
              <button
                onClick={() => {
                  handleUpdateClick(jobDetails.id);
                }}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default JobDetailsCompanies;

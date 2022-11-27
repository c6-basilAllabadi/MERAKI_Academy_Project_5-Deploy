import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteFav } from "../Redux/reducers/fav/fav";
import {
  setFavJobs,
  deleteFavJobs,
  setJobDetails,
  setCompanyDetailsInUsersApp,
  deleteFavJobsId,
} from "../Redux/reducers/Users/users";
import UserNavbar from "../UserNavbar/UserNavbar";
import "../UserFavJobs/UserFavJobs.css";
import Footer from "../Footer/Footer";
export default function UserFavJobs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allfav, setAllFav] = useState();

  const { userId, favJobs, token, favJobsId } = useSelector((state) => {
    return {
      userId: state.usersAuth.userId,
      favJobs: state.users.favJobs,
      token: state.usersAuth.token,
      favJobsId: state.users.favJobsId,
    };
  });

  const getAllFavJobs = () => {
    axios
      .get(`https://hire-me-kfab.onrender.com/jobs/favjobs/${userId}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        setAllFav(result.data.result);
        dispatch(setFavJobs(result.data.result));
        console.log(favJobsId);
        console.log(favJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllFavJobs();
  });

  const deleteFavJob = (favJobId) => {
    axios
      .delete(`https://hire-me-kfab.onrender.com/jobs/favjobs/${favJobId}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
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
      <UserNavbar />

      <div className="favHomeDiv1">
        <div className="favjobsCardsDiv1">
          {!allfav && (
            <div className="empety">
              <img alt = "empty_jobs" src="https://res.cloudinary.com/dfpuepvtg/image/upload/v1668974149/no_kxgfhk.png" />
              <h1> Browse Jobs NOW !</h1>
              <button
                className="button1"
                onClick={() => {
                  navigate("/users/userhome");
                }}
              >
                {" "}
                Browse Jobs now!{" "}
              </button>
            </div>
          )}
          {favJobs &&
            favJobs.map((elem, index) => {
              return (
                <div id={elem.id} key={index} className="favjobCard1">
                  <img alt = "empty_jobs" 
                    className="companyLogoCard1"
                    src={elem.companylogo}
                  ></img>
                  <h2
                    className="jobTitleCard1"
                    onClick={() => {
                      dispatch(setJobDetails(elem));
                      navigate("/users/jobdetails");
                    }}
                  >
                    {elem.jobtitle}
                  </h2>
                  <h4
                    className="companyNameCard1"
                    onClick={() => {
                      dispatch(setCompanyDetailsInUsersApp(elem));
                      navigate("/users/companydetails/userapp");
                    }}
                  >
                    {elem.companyname} - {elem.industry} - {elem.country}
                  </h4>

                  <p className="carerLevelCard1">
                    Career Level : {elem.careerlevel}
                  </p>
                  <p></p>
                  <p className="createdDateCard" style={{ fontSize: "12px" }}>
                    Date Posted :{elem.createdat.substring(0, 10)}
                  </p>
                  <p className="expiryDateCard" style={{ fontSize: "12px" }}>
                    Expiry Date: {elem.expirydate.substring(0, 10)}
                  </p>
                  <p className="jobDescription1">
                    {elem.jobdescription.substring(0, 150)}...
                  </p>

                  <button
                    className="deleteFavButton1"
                    onClick={() => {
                      deleteFavJob(elem.id);
                      dispatch(deleteFav(elem.id));
                      dispatch(deleteFavJobs(elem.id));
                      dispatch(deleteFavJobsId(elem.jobid));
                    }}
                  >
                    {" "}
                    Delete from Favorite
                  </button>
                </div>
              );
            })}
        </div>
        <div className="video2">
          <video
            style={{ width: "400px" }}
            autoplay="true"
            muted="true"
            playsinline="true"
            loop="true"
          >
            <source
              src="https://www.freshresume.co/video/Freshresume_t1_new.mp4"
              type="video/mp4"
            />
          </video>
          <h1>
            Create a winning<br></br>
            resume in minutes..
          </h1>

          <a
            href="https://www.freshresume.co/info/63754103e4e84dce557bca1e"
            target="blank"
          >
            <button className="createCvButton">Create Your Resume</button>
          </a>
        </div>
        <div className="Footer_user">
          <Footer />
        </div>
      </div>
    </>
  );
}

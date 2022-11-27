import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setuserDetailsInCompanyApp,
  setRelativeUsers,
} from "../Redux/reducers/Companies/companies";
import CompaniesNavbar from "../CompaniesNavbar/CompaniesNavbar";
import "./CompaniesHome.css";
import FilterNavCompanies from "../FilterNavCompanies/FilterNavCompanies";
import { setAllUsers,addFavUsersId } from "../Redux/reducers/Companies/companies";
import Footer from "../Footer/Footer";
const CompaniesHome = () => {
  const dispatch = useDispatch();
  const { companyId, companyDetails, allUsers,favUsersId } = useSelector(
    (state) => {
      return {
        companyId: state.CompaniesAuth.companyId,
        companyDetails: state.companies.companyDetails,
        allUsers: state.companies.allUsers,
        favUsersId:state.companies.favUsersId
      };
    }
  );

  const { isLoggedIn, token } = useSelector((state) => {
    return {
      isLoggedIn: state.CompaniesAuth.isLoggedIn,
      token: state.CompaniesAuth.token,
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
  const handleCompaniesFavUsers = (userId) => {
    axios
      .post(
        `https://hire-me-kfab.onrender.com/companies/favusers/${companyId}`,
        { userId },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
  console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRelevantUsers = () => {
    axios
      .get(`https://hire-me-kfab.onrender.com/users/search?search=${companyDetails.industry}`)
      .then((result) => {
        console.log(companyDetails)
        console.log(result)
        console.log(result.data.result);
        dispatch(setAllUsers(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    {
      console.log(isLoggedIn);
    }
  }, []);

  return (
    <>
      <CompaniesNavbar />
      <div className="IconDiv2">
<img src="https://res.cloudinary.com/did6jp3bj/image/upload/v1668709233/hire-me-logoSvg_nwibby.svg"></img>
</div>
      <div className="companyHomeDiv3">
        <div className="filterNav3">
          <FilterNavCompanies />
        </div>
        
        <div className="usersCardsDiv3">
          <button className="addFavCard" style={{marginLeft:"0px",marginBottom:"40px"}}
            onClick={() => {
              handleRelevantUsers();
            }}
          >
            {" "}
            Find Relative Users{" "}
          </button>
          {!allUsers && (
            <div className="empety">
              <img src="https://res.cloudinary.com/dfpuepvtg/image/upload/v1668974149/no_kxgfhk.png" />
              <h1> No Relative Users at the moment </h1>
            </div>
          )}
          {allUsers &&
            allUsers.map((elem, index) => {
              return (
                <div id={elem.id} key={index} className="userCard3">
                  <img className="userImageCard3" src={elem.userimage}></img>
                  <h2
                    className="fullNameCard1"
                    onClick={() => {
                      dispatch(setuserDetailsInCompanyApp(elem));
                      navigate("/companies/userdetails/companyapp");
                    }}
                  >
                    {elem.fullname}
                  </h2>
                  <h3 className="userjobsdetailingCard1">
                    {elem.recentjobtitle} - {elem.industryofrecentjob} -{" "}
                    {elem.wheredoyoulive}
                  </h3>
                  <p className="Majorusercard1"> Major : {elem.major} - {elem.educationalinstitutename}</p>
                  <p className="yearsofexperienceusercard12">
                    {" "}
                    Years Of Experience : {elem.yearsofexperience}
                  </p>
                  <p className="Languagesusercard1">
                    {" "}
                    Languages : {elem.languages}
                  </p>
                  {!favUsersId.includes(elem.id)&& <button
                    className="addFavCard1"
                    onClick={(e) => {
                      handleCompaniesFavUsers(elem.id);
                      dispatch(addFavUsersId(elem.id))
                     
                    }}
                  >
                   Add to Favorite
                  </button>}
                  {favUsersId.includes(elem.id)&& <button
                    className="addFavCard1"
                   
                  >
                   Added to Favorite
                  </button>}
               
                </div>
              );
            })}
        </div>
        <div className="video3">
      
      <video  style={{width:"400px"}} autoplay="true" muted="true" playsinline="true" loop="true" >
    <source src="https://www.freshresume.co/video/Freshresume_t1_new.mp4" type="video/mp4"/>
  </video>
  <h1>Create a winning<br></br>
    portfolio in minutes..</h1>
   
    <a href="https://portfolio.adobe.com/start" target="blank"><button className="createCvButton1" >Create Your Portfolio</button></a>
      </div>
      <div className="Footer_company">
      <Footer/>
      </div>
      </div>
     
    </>
  );
};

export default CompaniesHome;

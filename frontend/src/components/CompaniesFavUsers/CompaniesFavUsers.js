import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavUsers,
  deleteFavUsers,
} from "../Redux/reducers/Companies/companies";
import { setuserDetailsInCompanyApp,setRelativeUsers,deleteFavUsersId } from "../Redux/reducers/Companies/companies";
import CompaniesNavbar from "../CompaniesNavbar/CompaniesNavbar";
import "./CompaniesFavUsers.css"
import Footer from "../Footer/Footer";
const CompaniesFavUsers = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { companyId, favUsers ,token} = useSelector((state) => {
    return {
      companyId: state.CompaniesAuth.companyId,
      favUsers: state.companies.favUsers,
      token:state.CompaniesAuth.token
    };
  });
  const [allCompaniesFavUsers, setAllCompaniesFavUsers] = useState("");

  const getCompaniesFavUsers = () => {
    axios
      .get(`https://hire-me-kfab.onrender.com/companies/favusers/${companyId}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(setFavUsers(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteCompaniesFavUsers = (favId) => {
    axios
      .delete(`https://hire-me-kfab.onrender.com/companies/favusers/${favId}`,{
        headers: {
          authorization: "Bearer " + token,
        }})
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(deleteFavUsers(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompaniesFavUsers();
  }, []);
  return (
    <>
    <CompaniesNavbar/>
    <div className="companyfavDiv">
   <div className="usersCardsDivcompanyfav">
   {!favUsers.length&& <div className="empety">
      <img src="https://res.cloudinary.com/dfpuepvtg/image/upload/v1668974149/no_kxgfhk.png" />
      <h1> Browse Users NOW !</h1>
      <button className="button1" onClick={()=>{navigate('/companies/companieshome')}} > Browse Jobs now!  </button>
      </div>}
        {favUsers &&
          favUsers.map((elem, index) => {
            return (
              <div id={elem.id} key={index} className="userCard">
              <img className="userImageCard" src={elem.userimage}></img>
              <h2 className="fullNameCard" onClick={()=>{
                dispatch(setuserDetailsInCompanyApp(elem))
                navigate('/companies/userdetails/companyapp')
                
              }}>{elem.fullname}</h2>
                <h3 className="userjobsdetailingCard">{elem.recentjobtitle} - {elem.industryofrecentjob} - {elem.wheredoyoulive}</h3>
                <p className="Majorusercard"> Major : {elem.major} - {elem.educationalinstitutename}</p>
                <p className="yearsofexperienceusercard"> Years Of Experience : {elem.yearsofexperience}</p>
                <p className="Languagesusercard"> Languages : {elem.languages}</p>
                <button className="deleteFavCard"
                  onClick={() => {
                    deleteCompaniesFavUsers(elem.id);
                    dispatch(deleteFavUsersId(elem.userid));
                  }}
                >
                  Delete From Favorites
                </button>
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
      <div className="Footer_user">
      <Footer/>
      </div>
      
      </div>
    </>
  );
};

export default CompaniesFavUsers;

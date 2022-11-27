import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyDetails, setCompanyLogo } from "../Redux/reducers/Companies/companies";
import CompaniesNavbar from "../CompaniesNavbar/CompaniesNavbar";
import "./CompaniesComplete.css"
import Footer from "../Footer/Footer";
const CompaniesComplete = () => {
  const [companyWebsite, setCompanyWebsite] = useState(null);
  const [ceo, setCeo] = useState(null);
  const [workingHours, setWorkingHours] = useState(null);
  const [weekends, setWeekends] = useState(null);
  const [lunchBreak, setLunchBreak] = useState(null);
  const [companyOverview, setCompanyOverview] = useState(null);
  const [officeLocation, setOfficeLocation] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { companyId, companyLogo,token } = useSelector((state) => {
    return {
      companyId: state.CompaniesAuth.companyId,
      companyLogo: state.companies.companyLogo,
      token:state.CompaniesAuth.token
    };
  });

  const [registeredSucssfully, setRegisteredSucssfully] = useState(false);



  
  const uploadImage = (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "basel_project5");

    axios
      .post("https://api.cloudinary.com/v1_1/did6jp3bj/image/upload", formData)
      .then((response) => {
        dispatch(setCompanyLogo(response.data.secure_url));
        console.log(companyLogo);
      });
  };
  const body = {
    companyWebsite,
    ceo,
    workingHours,
    weekends,
    lunchBreak,
    companyOverview,
    companyLogo,
    officeLocation,
  };

  const handleRegister = () => {
    axios
      .put(`https://hire-me-kfab.onrender.com/register/companies/${companyId}`, body,{
        headers: {
          authorization: "Bearer " + token,
        }})
      .then((response) => {
        setRegisteredSucssfully(true);
        dispatch(setCompanyDetails(response.data.result))
        setTimeout(() => {
          navigate("/companies/company/companydetails");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <CompaniesNavbar/>
    <div className="bigDivRegisterComplete">
      <div className="infoContainerRegister1">
       

        <input
          placeholder="Company Website"
          className="RegInput"
          onChange={(e) => {
            setCompanyWebsite(e.target.value);
          }}
        />

        <input
          placeholder="CEO"
          className="RegInput"
          onChange={(e) => {
            setCeo(e.target.value);
          }}
        />

        <input
          placeholder="Working Hours"
          className="RegInput"
          onChange={(e) => {
            setWorkingHours(e.target.value);
          }}
        />

        <input
          placeholder="Weekends"
          className="RegInput"
          onChange={(e) => {
            setWeekends(e.target.value);
          }}
        />

        <input
          placeholder="Lunch Break"
          className="RegInput"
          onChange={(e) => {
            setLunchBreak(e.target.value);
          }}
        />

     
       
        <input
          placeholder="Office Location"
          className="RegInput"
          onChange={(e) => {
            setOfficeLocation(e.target.value);
          }}
        />

<textarea
          placeholder="Company Overview"
          className="RegInputText"
          onChange={(e) => {
            setCompanyOverview(e.target.value);
          }}
        />


<button
          className="registerButton1complete"
          onClick={() => {
            handleRegister();
          }}
        >
          {" "}
          Complete Information !
        </button>
        <br></br>
        {registeredSucssfully && 
            <h3 style={{color:"#3a3b3d",marginLeft:"-110px"}}> Completed Successfully !</h3>
          }
         </div>
     

      
      <div className="Footer_user">
      <Footer/>
      </div>
    </div>
    
    </>
  );
};
export default CompaniesComplete;

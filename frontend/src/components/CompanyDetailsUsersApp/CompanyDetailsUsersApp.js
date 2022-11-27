import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CompanyDetailsUsersApp.css"
import UserNavbar from "../UserNavbar/UserNavbar";
import {setCompanyIdUserApp} from "../Redux/reducers/Users/users"
import Footer from "../Footer/Footer";
function CompanyDetailsUsersApp() {

  const dispatch =useDispatch()
  const navigate=useNavigate()

  const { companyDetailsInUsersApp } = useSelector((state) => {
    return {
      companyDetailsInUsersApp: state.users.companyDetailsInUsersApp,
    };
  });

  return (
    <>
    <UserNavbar/>
        <div className="companyDetailsMainDiv2">
        <div className="companyDetailsCard2">
        
        <div className="generallInfocompanydetails2">
        
     
          <img alt = "empty_jobs" className="companyDetailLogo2" src={companyDetailsInUsersApp.companylogo}></img>
         
          <div>
              <p style={{ fontWeight: "600" }}>Company Name:</p><p>{companyDetailsInUsersApp.companyname}</p></div>
              <div> <p style={{ fontWeight: "600" }}>Industry:</p><p>{companyDetailsInUsersApp.industry}</p></div>
              <div><p style={{ fontWeight: "600" }}>Country:</p><p>{companyDetailsInUsersApp.country}</p></div>
              <div><p style={{ fontWeight: "600" }}>City:</p><p>{companyDetailsInUsersApp.city}</p></div>
              <div><p style={{ fontWeight: "600" }}>Number Of Employees:</p><p>{companyDetailsInUsersApp.numberofemployees}</p></div>
              <div><p style={{ fontWeight: "600" }}>Contact Person:</p><p>{companyDetailsInUsersApp.contactperson}</p></div>
              <div><p style={{ fontWeight: "600" }}>Phone Number:</p><p>{companyDetailsInUsersApp.phonenumber}</p></div>
              <p style={{ fontWeight: "600" }}>Website:</p><p>{companyDetailsInUsersApp.companywebsite}</p>
        </div>
      <div className="detailedInfo">
      <div><p style={{ fontWeight: "600" }}>Company Overview </p><p>{companyDetailsInUsersApp.companyoverview}</p></div>
      <div className="additionalInfo">
      <div><p style={{ fontWeight: "600" }}>Working Hours </p><p>{companyDetailsInUsersApp.workinghours}</p></div>
      <div><p style={{ fontWeight: "600" }}>Lunch Break </p><p>{companyDetailsInUsersApp.lunchbreak}</p></div>
      <div><p style={{ fontWeight: "600" }}>Weekends </p><p>{companyDetailsInUsersApp.weekends}</p></div>
      <div><p style={{ fontWeight: "600" }}>ceo: </p><p>{companyDetailsInUsersApp.ceo}</p>
      </div>
</div>
<button className="sendmessage" onClick={()=>{
dispatch(setCompanyIdUserApp(companyDetailsInUsersApp.companyid))
console.log(companyDetailsInUsersApp.companyid)
navigate("/messenger")
    }}> Send Message</button>

     

</div>


 </div>
 </div>
 <div className="Footer_user">
      <Footer/>
      </div>
      
    </>
  
     
     
  );
}

export default CompanyDetailsUsersApp;

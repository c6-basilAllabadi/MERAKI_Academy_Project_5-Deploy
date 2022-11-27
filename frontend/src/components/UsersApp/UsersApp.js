
import { Routes, Route, Link , useNavigate ,useParams } from "react-router-dom";
import {useEffect , useState , createContext} from "react"
import LoginUser from "../LoginUser/Login";
import RegisterUser from "../RegisterUser/Register";
import UserHome from "../UserHome/UserHome";
import UserComplete from "../UserComplete/UserComplete"
import UserNavbar from "../UserNavbar/UserNavbar";
import UserFavJobs from "../UserFavJobs/UserFavJobs";
import UserDetails from "../UserDetails/UserDetails";
import CompanyDetailsUsersApp from "../CompanyDetailsUsersApp/CompanyDetailsUsersApp";
import JobDetailsUsers from "../JobDetailsUsers/JobDetailUsers";
import UserAppliedJobs from "../UserAppliedJobs/UserAppliedJobs";

import "./user.css";

function UsersApp() {

  return <div

   className="App">

<Routes>
      <Route path = "/user/login" element={<LoginUser/> }  />
      <Route path = "/user/register" element={<RegisterUser/> } />
      <Route path ="/userhome" element ={<UserHome/>}/>
      <Route path ="/user/complete" element ={<UserComplete/>}/>
      <Route path ="/user/favjobs" element ={<UserFavJobs/>}/>
      <Route path ="/user/userdetails" element ={<UserDetails/>}/>
      <Route path="/companydetails/userapp" element={<CompanyDetailsUsersApp/>}/>
      <Route path = "/jobdetails" element ={<JobDetailsUsers/>}/>
      <Route path="/user/appliedjobs" element = {<UserAppliedJobs/>}/>

    


</Routes>

   </div>;
}

export default UsersApp;

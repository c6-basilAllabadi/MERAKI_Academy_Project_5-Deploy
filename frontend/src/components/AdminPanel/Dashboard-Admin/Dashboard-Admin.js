import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setCompanies ,setJobs,setUsers ,setDeleteCompany ,setDeleteUser,setDeleteJob} from "../../Redux/reducers/Admin/admin"





function Dashboard() {


    const { users ,companies ,jobs} = useSelector((state) => {
        return {
            users: state.admin.users,
            companies : state.admin.companies,
            jobs : state.admin.jobs
    
        };
      });


  const navigate = useNavigate();
const dispatch =useDispatch()
 //const [users, setUsers] = useState([]);
 // const [jobs, setJobs] = useState([]);
  //const [companies, setCompanies] = useState([]);

  //const [id, setId] = useState(3);

  const getAllUsers = () => {
    axios
      .get("https://hire-me-kfab.onrender.com/admin/users")
      .then((result) => {
        console.log(result.data.result);
       dispatch (setUsers(result.data.result));

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllJobs = () => {
    axios
      .get("https://hire-me-kfab.onrender.com/admin/jobs")
      .then((result) => {
        console.log(result.data.result);
       dispatch (setJobs(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCompanies = () => {
    axios
      .get("https://hire-me-kfab.onrender.com/admin/companies")
      .then((result) => {
        console.log(result.data.result);
      dispatch  (setCompanies(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };



 

 

  useEffect(() => {
    getAllCompanies();
    getAllJobs();
    getAllUsers();
  }, []);

  return (
    <>
      <div className="bigDiv">
             <p onClick={()=>{navigate("/admin/users")}}>Users </p>
             <p onClick={()=>{navigate("/admin/companies")}}>Companies </p>
             <p onClick={()=>{navigate("/admin/jobs")}}>Jobs </p>

      </div>
    </>
  );
}

export default Dashboard;

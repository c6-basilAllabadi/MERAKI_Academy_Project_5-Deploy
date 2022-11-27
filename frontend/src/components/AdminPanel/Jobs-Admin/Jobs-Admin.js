import React from 'react'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {setDeleteJob} from "../../Redux/reducers/Admin/admin"
import "./Jobs-admin.css"
function Jobs() {


    const {jobs} = useSelector((state) => {
        return {
            jobs : state.admin.jobs
    
        };
      });

      const dispatch =useDispatch()

      const deleteJob = (jobId) => {
        axios
          .put(`https://hire-me-kfab.onrender.com/admin/jobs/${jobId}`)
          .then((result) => {
            console.log(result);
         
            dispatch(setDeleteJob(result.data.result))
    
       
          })
          .catch((err) => {
            console.log(err);
          });
      };






  return (
<div>
          <h1> Jobs</h1>
          <table>
            <tr>
              <th>Id</th>
              <th>Job Title</th>
              <th>Company Name</th>
              <th>industry</th>
              <th>phonenumber</th>
              <th>country</th>
              <th>Contact Person</th>
              <th>salary</th>
              <th>Years Of Experience</th>
              <th>Email</th>
              <th>Password</th>
              <th>Detele Job</th>

            </tr>

            {jobs &&
              jobs.map((elem, i) => {
                return (
                  <>
                    <tr >
                      <td> {elem.id} </td>
                      <td> {elem.jobtitle} </td>
                      <td> {elem.companyname} </td>
                      <td> {elem.industry} </td>
                      <td> {elem.phonenumber} </td>
                      <td> {elem.country} </td>
                      <td> {elem.contactperson} </td>
                      <td> {elem.salary} </td>
                      <td> {elem.yearsofexperience} </td>
                      <td> {elem.email} </td>
                      <td> {elem.password} </td>

        {elem.is_deleted===0&& <button onClick={()=>{deleteJob(elem.id)}}>Delete</button> }
                    </tr>

                  </>
                );
              })}
          </table>
        </div>
  )


}

export default Jobs
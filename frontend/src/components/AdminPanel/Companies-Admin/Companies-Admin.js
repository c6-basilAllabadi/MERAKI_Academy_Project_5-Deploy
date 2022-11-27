import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setCompanies ,setJobs,setUsers ,setDeleteCompany ,setDeleteUser,setDeleteJob} from "../../Redux/reducers/Admin/admin"
import "./Companies-Admin.css"
function Companies() {

    const { users ,companies ,jobs} = useSelector((state) => {
        return {
            users: state.admin.users,
            companies : state.admin.companies,
            jobs : state.admin.jobs
    
        };
      });

      const navigate = useNavigate();
      const dispatch =useDispatch()

      const deleteCompany = (CompanyId) => {
        axios
          .put(`https://hire-me-kfab.onrender.com/admin/companies/${CompanyId}`)
          .then((result) => {
    
            console.log(result);
            dispatch(setDeleteCompany(result.data.result))
            
          })
          .catch((err) => {
            console.log(err);
          });
      };




  return (
    <div>
          <h1> Companies</h1>
          <table>
            <tr>
              <th>Id</th>
              <th>Company Name</th>
              <th>industry</th>
              <th>phonenumber</th>
              <th>country</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Password</th>
              <th>IS DELETED</th>
              <th>Detele Company</th>
            </tr>

            {companies &&
              companies.map((elem, i) => {
                return (
                  <>
                    <tr>
                      <td> {elem.id} </td>
                      <td> {elem.companyname} </td>
                      <td> {elem.industry} </td>
                      <td> {elem.phonenumber} </td>
                      <td> {elem.country} </td>
                      <td> {elem.contactperson} </td>
                      <td> {elem.email} </td>
                      <td> {elem.password} </td>
                      <td> {elem.is_deleted} </td>
         {elem.is_deleted==0&& <button onClick={()=>{deleteCompany(elem.id)}}>Delete</button>}
                    </tr>
                  </>
                );
              })}
          </table>
        </div>
  )
}

export default Companies
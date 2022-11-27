import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setCompanies ,setJobs,setUsers ,setDeleteCompany ,setDeleteUser,setDeleteJob} from "../../Redux/reducers/Admin/admin"
import "./Users-Admin.css"

function Users() {

    const { users ,companies ,jobs} = useSelector((state) => {
        return {
            users: state.admin.users,
            companies : state.admin.companies,
            jobs : state.admin.jobs
    
        };
      });

      const navigate = useNavigate();
      const dispatch =useDispatch()

      const deleteUser = (id) => {
        axios
          .put(`https://hire-me-kfab.onrender.com/admin/users/${id}`)
          .then((result) => {
          dispatch(setDeleteUser(result.data.result))
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      };

  return (

    <div>
    <h1> Users</h1>
    <table>
      <tr>
        <th>Id</th>
        <th>Full Name</th>
        <th>Gender</th>
        <th>phonenumber</th>
        <th>Email</th>
        <th>Password</th>
        <th>IS DELETED</th>
        <th>Detele User</th>
      </tr>

      {users &&
        users.map((elem, i) => {
          return (
            < >
              <tr >
                <td> {elem.id} </td>
                <td> {elem.fullname} </td>
                <td> {elem.gender} </td>
                <td> {elem.phonenumber} </td>
                <td> {elem.email} </td>
                <td> {elem.password} </td>
                <td> {elem.is_deleted} </td>

   {elem.is_deleted==0&& <button onClick={()=>{deleteUser(elem.id)}}>Delete</button>}
              </tr>
            </>
          );
        })}
    </table>
  </div>
  )
}

export default Users
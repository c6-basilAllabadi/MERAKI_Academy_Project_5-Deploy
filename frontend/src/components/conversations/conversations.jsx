import React from 'react'
import "./conversations.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { setCompanyIdUserApp } from '../Redux/reducers/Users/users';
import { useEffect, useState } from "react";
import {setUserCoId} from "../Redux/reducers/Companies/companies";

export default function Conversations() {

const dispatch =useDispatch()

  const { userName, room,  companyId ,userId,companyIdUserApp,userCoId  } = useSelector((state) => {
    return {
      userName: state.messenger.userName,
      room: state.messenger.room,
    
      companyIdUserApp: state.users.companyIdUserApp,
      userId: state.usersAuth.userId,
      companyId: state.CompaniesAuth.companyId ,
      userCoId: state.companies.userCoId,

    };
  });

const [conv, setConv] = useState([])
const [image, setImage] = useState([])

let people = []



const change =(userId,companyId)=>{

dispatch(setCompanyIdUserApp(companyId))
dispatch(setUserCoId(userId))

}



 useEffect( () => {

if(userId){


  axios
  .get(`https://hire-me-kfab.onrender.com/messenger/${userId}`)
  .then((result) => {
    console.log(result);
    console.log(result.data.result);
    console.log("from USER GET")
    setImage(result.data.result.image);
    
    setConv(result.data.result)
  })
  .catch((err) => {
    console.log(err);
  });
}

else{

  axios
  .get(`https://hire-me-kfab.onrender.com/messenger?companyId=${companyId}`)
  .then((result) => {
    console.log(result);
    console.log(result.data.result);
    console.log("from Company GET")
    setConv(result.data.result)
  })
  .catch((err) => {
    console.log(err);
  });

}
 })






for (let index = 0; index < conv.length; index++) {
if(conv[index].sender!==userName){
  people.push(conv[index])
}
}


  return (
<>

    <div >

  





{people&&people.map((elem,i)=>{
  return (
    <div className='conversations' onClick={()=>{change(elem.userid,elem.companyid);console.log("company id is  "+ elem.companyid);console.log("User id is  "+ elem.userid)}}>
    <img className='conversationImg' src={elem.image} alt="" />
    <span> {elem.sender}</span>
       </div>

  )
})}

    <span className='conversationName'></span>

    </div>
    </>
  )
}

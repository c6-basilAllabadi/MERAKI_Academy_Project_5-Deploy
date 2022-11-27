import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



function CompanyRelevantUsers() {

    const {relativeUsers} = useSelector((state) => {
        return {
            relativeUsers: state.companies.relativeUsers,
        };
      });

    {console.log(relativeUsers)}

  return (
<>
    <div>
{relativeUsers&&relativeUsers.map((elem,i)=>{
    return ( <>
    <div>
   <p>{elem.fullname}</p>
<p>{elem.citizenships}</p>
<p>{elem.cv}</p>
<p>{elem.dateofbirth}</p>
 <p>{elem.educationalinstitutename}</p>
 <p>{elem.gender}</p>
 <p>{elem.languages}</p>
 <p>{elem.major}</p>
 <p>{elem.maritalstatus}</p>
 <p>{elem.phonenumber}</p>
 <p>{elem.recentjobfunction}</p>
<p>{elem.recentjobtitle}</p>
 <p>{elem.residencystatus}</p>
 <p>{elem.skills}</p>
<p>{elem.wheredoyoulive}</p>
 <p>{elem.yearsofexperience}</p>
 </div>
    </>)
})}
    </div>
    </>

  )
}

export default CompanyRelevantUsers
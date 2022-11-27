import React from 'react'
import {useSelector } from "react-redux"

function CompanyRelevantUsers() {

    const {relativeUsers} = useSelector((state) => {
        return {
            relativeUsers: state.companies.relativeUsers,
        };
      });

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
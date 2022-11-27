import React from 'react'
import "./Footer.css"
function Footer() {
  return (
    <footer>
        <div class="content">
          <div class="left_box">
            <div class="upper">
              <div class="topic">About</div><br></br>
              <p>HireMe.com is the leading job site in Jordan, connecting job seekers with employers looking to hire. Every day, hundreds of new job vacancies are listed on the award winning platform from the region's top employers</p>
            </div>
          </div>
          
          <div class="middle_box">

            <img class="logo2" src="https://res.cloudinary.com/did6jp3bj/image/upload/v1669058302/hireMeLogoDARKMODE_qshinv.svg" />
          </div>

          <div class="right_box">
            <div class="topic">Contact</div><br></br>
            <div class="phone">
              <a href="#"><i class="fas fa-phone-volume"></i>+962-78-6682097</a><br></br>
              <a href="#"><i class="fas fa-phone-volume"></i>+962-79-0228491</a><br></br>
            </div>
            <div class="email">
              <a href=""><i class="fas fa-envelope"></i> ahmad.h.qadoura@gmail.com</a>
              <a href=""> basel.labadi@gmail.com</a>
            </div>
            <div class="bottom bot">
              <p>Copyright © 2022 <a href="#"> Basil Labadi ,Ahmad Qadoura </a> All rights reserved</p>
            </div>
        </div>
     </div>
       
      </footer>
  )
}

export default Footer
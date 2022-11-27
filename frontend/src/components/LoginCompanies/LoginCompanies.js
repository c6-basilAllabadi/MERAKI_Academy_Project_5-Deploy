
import {useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginCompanies.css";
import { useDispatch, useSelector } from "react-redux"
import { setLogin, setCompanyId } from "../Redux/reducers/CompaniesAuth/index";
import { setCompanyDetails, setFavUsers, setFavUsersId } from "../Redux/reducers/Companies/companies";
import { setUserName,setImage } from "../Redux/reducers/Messenger/messenger";



const LoginCompanies = () => {
  const { isLoggedIn,companyDetails } = useSelector((state) => {
    return { isLoggedIn: state.CompaniesAuth.isLoggedIn,
      companyDetails:state.companies.companyDetails };
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInSucssfully, setLoggedInSucssfully] = useState(false);
  const [iserror, setIserror]= useState(false)
  const body = { email, password };

  const handleLogin = () => {
    axios
      .post("https://hire-me-kfab.onrender.com/login/companies",body)
      .then((response) => {
       
        setLoggedInSucssfully(true);
        console.log(response.data.token);
        console.log(response.data.payload.companyId);
        dispatch(setLogin(response.data.token))
        dispatch(setCompanyId(response.data.payload.companyId))
        dispatch(setCompanyDetails(response.data.payload.company))
        dispatch(setUserName(response.data.payload.company.companyname))
        navigate('/companies/companieshome')
        dispatch(setImage(response.data.payload.company.companylogo))
    
        console.log(isLoggedIn)
        console.log(companyDetails)
       getCompaniesFavUsers(response.data.payload.companyId)
      })

      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        
      });
  };
  const getCompaniesFavUsers = (companyId1) => {
    axios
      .get(`https://hire-me-kfab.onrender.com/companies/favusers/${companyId1}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(setFavUsers(result.data.result));
        dispatch(setFavUsersId(result.data.result.map((elm, idx) => {
          return elm.userid;
        })))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
    
      <div className="mainPageLoginCompany">
      <div className="navbar_container">
          <p
            className="navbar_user_login_link"
            onClick={() => {
              navigate("/users/user/login");
            }}
          >
            Job Seeker Account
          </p>
          <p className="or">or</p>
          <p
            className="navbar_company_login_link"
            onClick={() => {
              navigate("/companies/companies/login");
            }}
          >
            Employer Account
          </p>
        </div>
        <div className="BigDivLogin">
    

            <div className="infoContainer">
              <h1 style={{textAlign:"left",marginBottom:"40px"}}>  Employer Account Login</h1>
              {/* <p> Email</p> */}
              <input
                className="emailInput"
                placeholder=" Email "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {/* <p> Password</p> */}
              <input
                type={"password"}
                className="emailInput"
                placeholder=" Password "
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              {loggedInSucssfully && (
                <div className="popuptry">
                  <h1> Logged In Successfully</h1>
                </div>
              )}

              <button
                className="loginButton"
                onClick={() => {
                  handleLogin();
                  
                }}
              >
                {" "}
                Sign In{" "}
              </button>
              <div className="popuptry">
              <h2 style={{ color: "#3a3b3d" }}>{!iserror ? error : null}</h2></div>
            </div>
          </div>
          <div className="paragraph">    <span style={{ fontWeight: 600 }}>Employer?</span>
              <p>Hire the perfect talent from many available candidate.</p>
              <span style={{ fontWeight: 600 }}>
                Post a Job{" "}
              </span> </div>
          <div className="belowLoginDiv">
        <p  className="registerLink" onClick={()=>{
          navigate('/companies/companies/register')
        }}>Dont Have Account! Register Now</p>
      </div>
      </div>
     
    </>
  );
};

export default LoginCompanies

import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCompanies,
  setJobs,
  setUsers

} from "../../Redux/reducers/Admin/admin";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const getAllUsers = () => {
    axios
      .get("https://hire-me-kfab.onrender.com/admin/users")
      .then((result) => {
        console.log(result.data.result);
        dispatch(setUsers(result.data.result));
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
        dispatch(setJobs(result.data.result));
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
        dispatch(setCompanies(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCompanies();
    getAllJobs();
    getAllUsers();
  });

  return (
    <>
      <div className="bigDiv">
        <p
          onClick={() => {
            navigate("/admin/users");
          }}
        >
          Users{" "}
        </p>
        <p
          onClick={() => {
            navigate("/admin/companies");
          }}
        >
          Companies{" "}
        </p>
        <p
          onClick={() => {
            navigate("/admin/jobs");
          }}
        >
          Jobs{" "}
        </p>
      </div>
    </>
  );
}

export default Dashboard;

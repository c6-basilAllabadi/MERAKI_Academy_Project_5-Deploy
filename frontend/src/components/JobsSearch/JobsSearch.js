
import { useDispatch} from "react-redux";
import axios from "axios";
import "./JobsSearch.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setAllJobs} from "../Redux/reducers/Users/users";



function JobsSearch() {
  const [search, setSearch] = useState("");
const Navigate =useNavigate()
  const dispatch = useDispatch();

  const HandleJobSearch = () => {
    axios
      .get(`https://hire-me-kfab.onrender.com/jobs/search/${search}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(setAllJobs(result.data.result));
 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div  className="search_input"><input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search"
        />

        <button
          onClick={() => {
            Navigate('/users/userhome')
            setTimeout(HandleJobSearch,100);
          }}
        >
        <i className="fas fa-search"></i>
        </button>
      </div>
    </>
  );
}

export default JobsSearch;

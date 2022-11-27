import react from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setAllJobs, setJobDetails } from "../Redux/reducers/Users/users";
import { setJobSearch } from "../Redux/reducers/Users/users.js";
import { setAllUsers } from "../Redux/reducers/Companies/companies";

function FilterNavCompanies() {
  const dispatch = useDispatch();

  const HandleUserSearch = (search) => {
    axios
      .get(`https://hire-me-kfab.onrender.com/users/search/?search=${search}`)
      .then((result) => {
        console.log(result);
        console.log(result.data.result);
        dispatch(setAllUsers(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="filterNavList">
        <ul>
          <h2>
            <i class="fas fa-filter"></i> &nbsp;Filter
          </h2>
          <h3>
            <i class="fas fa-toolbox"></i> &nbsp;Industry
          </h3>
          <li
            onClick={(e) => {
              HandleUserSearch("Non-Profit and Social Services");
            }}
          >
            <i class="fas fa-hand-holding-usd"></i>&nbsp;&nbsp;&nbsp;Non-Profit
            and Social Services
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Education and Training");
            }}
          >
            <i class="fas fa-graduation-cap"></i>&nbsp;&nbsp;&nbsp;Education and Training
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Government and Public Sector");
            }}
          >
            <i class="fas fa-university"></i>&nbsp;&nbsp;&nbsp;Government and
            Public Sector{" "}
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Healthcare and Medical Services");
            }}
          >
            <i class="fas fa-hand-holding-medical"></i>
            &nbsp;&nbsp;&nbsp;Healthcare and Medical Services
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Retail and Wholesale");
            }}
          >
            <i class="fas fa-cash-register"></i>&nbsp;&nbsp;&nbsp;Retail and
            Wholesale{" "}
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Telecommunications");
            }}
          >
            <i class="fas fa-satellite-dish"></i>
            &nbsp;&nbsp;&nbsp;Telecommunications
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Call Center, Telemarketing and BPO");
            }}
          >
            <i class="fas fa-phone-alt"></i>&nbsp;&nbsp;&nbsp;Call Center,
            Telemarketing and BPO
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Catering, Food Services and Restaurants");
            }}
          >
            <i class="fas fa-utensils"></i>&nbsp;&nbsp;&nbsp;Catering, Food
            Services and Restaurants
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Banking and Financial Services");
            }}
          >
            <i class="fas fa-coins"></i>&nbsp;&nbsp;&nbsp;Banking and Financial
            Services
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Manufacturing and Production");
            }}
          >
            <i class="fas fa-industry"></i>&nbsp;&nbsp;&nbsp;Manufacturing and
            Production
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Marketing, Advertising and Public Relations");
            }}
          >
            <i class="fas fa-shopping-cart"></i>&nbsp;&nbsp;&nbsp;Marketing,
            Advertising and Public Relations
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Shipping and Logistics");
            }}
          >
            <i class="fas fa-shipping-fast"></i>&nbsp;&nbsp;&nbsp;Shipping and
            Logistics{" "}
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Consultancy");
            }}
          >
            <i class="fas fa-layer-group"></i>&nbsp;&nbsp;&nbsp;Consultancy
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Furniture and Office Equipment");
            }}
          >
            <i class="fas fa-couch"></i>&nbsp;&nbsp;&nbsp;Furniture and Office
            Equipment
          </li>
          <li
            value={"Property and Real Estate"}
            onClick={(e) => {
              HandleUserSearch("Property and Real Estate");
            }}
          >
            <i class="fas fa-home"></i>&nbsp;&nbsp;&nbsp;Property and Real
            Estate
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Business Support Services");
            }}
          >
            <i class="fas fa-briefcase"></i>&nbsp;&nbsp;&nbsp;Business Support
            Services
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch(
                "Employment Placement Agencies and Human Resources"
              );
            }}
          >
            <i class="fas fa-handshake"></i>&nbsp;&nbsp;&nbsp;Employment
            Placement Agencies and Human Resources{" "}
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Insurance");
            }}
          >
            <i class="fas fa-user-injured"></i>&nbsp;&nbsp;&nbsp;Insurance
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Law Enforcement and Security Services");
            }}
          >
            <i class="fas fa-gavel"></i>&nbsp;&nbsp;&nbsp;Law Enforcement and
            Security Services{" "}
          </li>
          <li
            onClick={(e) => {
              HandleUserSearch("Research and Development");
            }}
          >
            <i class="fas fa-search-dollar"></i>&nbsp;&nbsp;&nbsp;Research and
            Development{" "}
          </li>
        </ul>
      </div>
    </>
  );
}

export default FilterNavCompanies;

const pool = require("../models/db");

const getAllUsers = (req, res) => {



  const query = `SELECT * FROM Users WHERE is_deleted=0`;


  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "All Users",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    });
};

const usersSearch = (req, res) => {
  const searchWord = req.query.search;
  const value = [`%${searchWord}%`];
  const query = `SELECT * FROM users
WHERE users.industryOfRecentJob LIKE $1 AND users.is_deleted=0;`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: "Searched Users",
          result: result.rows,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: "No Matching users founded",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    });
};

const userUpdate = (req, res) => {
  const userId = req.params.userId;
  const {
    phoneNumber,
    maritalStatus,
    citizenships,
    whereDoYouLive,
    residencyStatus,
    yearsOfExperience,
    recentJobTitle,
    recentJobFunction,
    industryOfRecentJob,
    languages,
    skills,
    educationLevel,
    major,
    educationalInstituteName,
    cv,
    email,
    password,
    fullName,
    dateOfBirth,
    gender,
    userImage,
  } = req.body;
  const iscompleted = 1;
  const values = [
    userId || null,
    iscompleted || null,
    phoneNumber || null,
    maritalStatus || null,
    citizenships || null,
    whereDoYouLive || null,
    residencyStatus || null,
    yearsOfExperience || null,
    recentJobTitle || null,
    recentJobFunction || null,
    industryOfRecentJob || null,
    languages || null,
    skills || null,
    educationLevel || null,
    major || null,
    educationalInstituteName || null,
    cv || null,
    email || null,
    password || null,
    fullName || null,
    dateOfBirth || null,
    gender || null,
    userImage || null
  ];
  const query = `UPDATE users SET iscompleted =COALESCE($2,iscompleted), phoneNumber = COALESCE($3,phoneNumber), maritalStatus = COALESCE($4,maritalStatus),citizenships=COALESCE($5,citizenships),whereDoYouLive=COALESCE($6,whereDoYouLive),residencyStatus=COALESCE($7,residencyStatus),yearsOfExperience=COALESCE($8,yearsOfExperience),recentJobTitle=COALESCE($9,recentJobTitle),recentJobFunction=COALESCE($10,recentJobFunction),industryOfRecentJob=COALESCE($11,industryOfRecentJob),languages=COALESCE($12,languages),skills=COALESCE($13,skills) ,educationLevel=COALESCE($14,educationLevel),major=COALESCE($15,major),educationalInstituteName=COALESCE($16,educationalInstituteName),cv=COALESCE($17,cv), email=COALESCE($18,email),password=COALESCE($19,password),fullName=COALESCE($20,fullName),dateOfBirth= COALESCE($21,dateOfBirth),gender= COALESCE($22,gender),userImage =COALESCE($23,userImage) WHERE id=$1 RETURNING *;`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "User Profile Completed",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        massage: "Something went Wrong",
        err,
      });
    });
};

module.exports = { getAllUsers, usersSearch, userUpdate };

const pool = require("../models/db");
const bcrypt = require("bcrypt");

const registerCompany = async (req, res) => {
  const {
    companyName,
    industry,
    numberOfEmployees,
    country,
    city,
    contactPerson,
    phoneNumber,
    email,
    password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const values = [
    companyName,
    industry,
    numberOfEmployees,
    country,
    city,
    contactPerson,
    phoneNumber,
    email.toLowerCase(),
    hashedPassword,
  ];
  const query =
    "INSERT INTO companies ( companyName, industry, numberOfEmployees, country, city, contactPerson, phoneNumber, email, password ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)";
  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        massage: "Account Created Successfully",
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        massage: "The email already exists",
        err,
      });
    });
};

const registerCompanyComplete = (req, res) => {
  const companyId = req.params.companyId;
  const {
    companyWebsite,
    ceo,
    workingHours,
    weekends,
    lunchBreak,
    companyOverview,
    companyLogo,
    officeLocation,
  } = req.body;
  const values = [
    companyId,
    companyWebsite || null,
    ceo || null,
    workingHours || null,
    weekends || null,
    lunchBreak || null,
    companyOverview || null,
    companyLogo || null,
    officeLocation || null,
  ];
  const query = `UPDATE companies SET companyWebsite = COALESCE($2,companyWebsite),ceo =COALESCE($3,ceo),workingHours=COALESCE($4,workingHours),weekends=COALESCE($5,weekends),lunchBreak=COALESCE($6,lunchBreak),companyOverview=COALESCE($7,companyOverview),companyLogo=COALESCE($8,companyLogo),officeLocation=COALESCE($9,officeLocation) WHERE id=$1 RETURNING *;`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "Company Profile Completed",
        result:result.rows[0]
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
module.exports = { registerCompany, registerCompanyComplete };

const pool = require("../models/db");

const getAllCompanies = (req, res) => {
  const query = `SELECT * FROM companies AND is_deleted=0 `;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "All companies",
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

const companiesSearch = (req, res) => {
  const searchWord = req.query.search;
  const value = [`%${searchWord}%`];
  const query = `SELECT * FROM companies
WHERE companyName LIKE $1 AND is_deleted=0;`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: "Searched Companies",
          result: result.rows,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: "No Matching Companies founded",
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

const addFavoriteUser = (req, res) => {
  const companyId = req.params.companyId;
  const { userId } = req.body;
  const values = [companyId, userId];
  const query = `INSERT INTO companiesFavoriteUsers (companyId,userId) VALUES($1,$2) RETURNING *`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "User added to Favorite Successfully",
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
const deleteFavoriteUser = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE companiesFavoriteUsers SET is_deleted=1 WHERE id=${id} RETURNING *;`;

  pool
    .query(query)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          massage: ` ${id} is not found`,
          err: err,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: `Succeeded to delete Favorite User with id: ${id}`,
          result: id,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    });
};

const getCompanyFavoriteUsers = (req, res) => {
  const companyId = req.params.companyId;
  const values = [companyId];
  const query = `SELECT * , companiesFavoriteUsers.id FROM companiesFavoriteUsers INNER JOIN users ON companiesFavoriteUsers.userId = users.id WHERE companyId=$1 AND companiesFavoriteUsers.is_deleted=0;`;
  pool
    .query(query, values)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: "Company Favorite Users",
          result: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          massage: "No Favorite Users Founded",
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
const companyUpdate = (req, res) => {
  const companyId = req.params.companyId;
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
    companyName || null,
    industry || null,
    numberOfEmployees || null,
    country || null,
    city || null,
    contactPerson || null,
    phoneNumber || null,
    email || null,
    password || null,
    companyWebsite || null,
    ceo || null,
    workingHours || null,
    weekends || null,
    lunchBreak || null,
    companyOverview || null,
    companyLogo || null,
    officeLocation || null,
  ];
  const query = `UPDATE companies SET companyName= COALESCE($2,companyName), industry= COALESCE($3,industry) ,numberOfEmployees= COALESCE($4,numberOfEmployees) , country=COALESCE($5,country),city= COALESCE($6,city),contactPerson= COALESCE($7,contactPerson),phoneNumber=COALESCE($8,phoneNumber),email= COALESCE($9,email),password= COALESCE($10,password),companyWebsite = COALESCE($11,companyWebsite),ceo =COALESCE($12,ceo),workingHours=COALESCE($13,workingHours),weekends=COALESCE($14,weekends),lunchBreak=COALESCE($15,lunchBreak),companyOverview=COALESCE($16,companyOverview),companyLogo=COALESCE($17,companyLogo),officeLocation=COALESCE($18,officeLocation) WHERE id=$1 RETURNING * ;`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "Company Profile Updated",
        result:result.rows
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
module.exports = {
  getAllCompanies,
  companiesSearch,
  addFavoriteUser,
  deleteFavoriteUser,
  getCompanyFavoriteUsers,
  companyUpdate,
};

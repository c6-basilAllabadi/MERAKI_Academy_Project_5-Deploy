const pool = require("../models/db");

const getAllCompanies = (req, res) => {
    const query = `SELECT * FROM companies `;
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

  const getAllUsers = (req, res) => {
    const query = `SELECT * FROM Users `;
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

  const getAllJobs = (req, res) => {
    const query = `SELECT * , jobs.id FROM jobs INNER JOIN companies ON jobs.companyId=companies.id WHERE jobs.is_deleted=0 `;
    pool
      .query(query)
      .then((result) => {
        res.status(200).json({
          success: true,
          massage: "All Jobs",
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

  const deleteJob = (req, res) => {

    const id = req.params.id;
    const query = `UPDATE Jobs SET is_deleted=1 WHERE id=${id} RETURNING *;`;
  
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
            massage: `Succeeded to delete Job with id: ${id}`,
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

  const deleteCompany = (req, res) => {

    const id = req.params.id;
    const query = `UPDATE companies SET is_deleted=1 WHERE id=${id} RETURNING *;`;
  
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
            massage: `Succeeded to delete Company with id: ${id}`,
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

  const deleteUser = (req, res) => {

    const id = req.params.id;
    const query = `UPDATE users SET is_deleted=1 WHERE id=${id} RETURNING *;`;
  
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
            massage: `Succeeded to delete User with id: ${id} `,
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

  module.exports = {getAllCompanies,getAllUsers ,getAllJobs,deleteJob,deleteUser,deleteCompany }
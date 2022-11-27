const pool = require("../models/db");

const addNewJob = (req, res) => {
  const {
    jobTitle,
    expiryDate,
    jobLocation,
    careerLevel,
    jobType,
    jobRole,
    yearsOfExperience,
    countryOfCitizenship,
    countryOfResidence,
    salary,
    numberOfHires,
    jobDescription,
    language,
    jobRequirements,
  } = req.body;
  const companyId = req.params.companyId;
  const data = [
    companyId,
    jobTitle,
    expiryDate,
    jobLocation,
    careerLevel,
    jobType,
    jobRole,
    yearsOfExperience,
    countryOfCitizenship,
    countryOfResidence,
    salary,
    numberOfHires,
    jobDescription,
    language,
    jobRequirements,
  ];
  const query = `INSERT INTO jobs(companyId,jobTitle, expiryDate,jobLocation,careerLevel,jobType,jobRole ,yearsOfExperience,countryOfCitizenship,countryOfResidence,salary,numberOfHires,jobDescription,language,jobRequirements) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "Job created",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
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

const getCompanyJobs = (req, res) => {
  const companyId = req.params.companyId;
  const value = [companyId];
  const query = `SELECT * , jobs.id FROM jobs INNER JOIN companies ON jobs.companyId=companies.id WHERE companyId=$1 AND jobs.is_deleted=0 `;
  pool
    .query(query, value)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "Company Jobs",
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

const deleteJobById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE jobs SET is_deleted=1 WHERE jobs.id=${id} RETURNING *;`;

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
const updateJobById = (req, res) => {
  const id = req.params.id;
  const {
    jobTitle,
    expiryDate,
    jobLocation,
    careerLevel,
    jobType,
    jobRole,
    yearsOfExperience,
    countryOfCitizenship,
    countryOfResidence,
    salary,
    numberOfHires,
    jobDescription,
    language,
    jobRequirements,
  } = req.body;

  const data = [
    jobTitle || null,
    expiryDate || null,
    jobLocation || null,
    careerLevel || null,
    jobType || null,
    jobRole || null,
    yearsOfExperience || null,
    countryOfCitizenship || null,
    countryOfResidence || null,
    salary || null,
    numberOfHires || null,
    jobDescription || null,
    language || null,
    jobRequirements || null,
  ];

  const query = `UPDATE jobs SET jobTitle = COALESCE($1,jobTitle),
       expiryDate = COALESCE($2, expiryDate),
       jobLocation = COALESCE($3, jobLocation),
       careerLevel = COALESCE($4, careerLevel),
       jobType = COALESCE($5,  jobType),
       jobRole = COALESCE($6, jobRole),
       yearsOfExperience = COALESCE($7, yearsOfExperience),
       countryOfCitizenship = COALESCE($8, countryOfCitizenship),
       countryOfResidence = COALESCE($9, countryOfResidence),
       salary = COALESCE($10, salary),
       numberOfHires = COALESCE($11, numberOfHires),
       jobDescription = COALESCE($12, jobDescription),
       language = COALESCE($13, language),
       jobRequirements = COALESCE($14, jobRequirements)
      WHERE jobs.id=${id} AND jobs.is_deleted = 0 RETURNING *;`;

  pool

    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          massage: `Job: ${id} is not found`,
        });
      } else {
        const value1 = [id];
        const query1 = `SELECT * , jobs.id FROM jobs INNER JOIN companies ON jobs.companyId=companies.id WHERE jobs.id=$1 AND jobs.is_deleted=0`;
        pool
          .query(query1, value1)
          .then((result1) => {
            res.status(200).json({
              success: true,
              massage: `Succeeded to updated Job with id: ${id}`,
              result: result1.rows[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              massage: "Server Error",
              err: err,
            });
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

const jobApply = (req, res) => {
  const userId = req.params.userId;
  const { jobId } = req.body;
  const values = [userId, jobId];
  const query = `INSERT INTO usersAppliedJobs (userId,jobId) VALUES($1,$2) RETURNING *`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "Job application created",
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
const deleteJobApplication = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE usersAppliedJobs SET is_deleted=1 WHERE id=${id};`;

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
          massage: `Succeeded to delete Job Application with id: ${id}`,
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
const getUserAppliedJobs = (req, res) => {
  const userId = req.params.userId;
  const value = [userId];
  const query = `SELECT * , usersappliedjobs.id FROM usersappliedjobs INNER JOIN jobs ON usersappliedjobs.jobId = jobs.id INNER JOIN companies ON jobs.companyId = companies.id WHERE usersappliedjobs.userId=$1 AND usersappliedjobs.is_deleted=0;`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: "User Applied Jobs",
          result: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          massage: "No User Applied Jobs founded",
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
const getCompanyAppliedJobs = (req, res) => {
  const companyId = req.params.companyId;
  const value = [companyId];
  const query = `SELECT * ,users.phonenumber, usersappliedjobs.id ,usersappliedjobs.is_deleted FROM usersappliedjobs INNER JOIN users ON usersappliedjobs.userId = users.id INNER JOIN jobs ON usersappliedjobs.jobId = jobs.id INNER JOIN companies ON jobs.companyId = companies.id WHERE companyId=$1 AND usersappliedjobs.is_deleted=0;`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: "Company Applied Jobs",
          result: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          massage: "No Company Applied Jobs founded",
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

const addFavJob = (req, res) => {
  const userId = req.params.userId;
  const jobId = req.body.jobId;
  const values = [userId, jobId];
  const query = `INSERT INTO usersFavoriteJobs (userId,jobId) VALUES($1,$2) RETURNING *`;
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: "Job added to Favorite Successfully",
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
const deleteFavoriteJob = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE usersFavoriteJobs SET is_deleted=1 WHERE id=${id};`;

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
          massage: `Succeeded to delete Favorite Job with id: ${id}`,
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
const getUserFavoriteJobs = (req, res) => {
  const userId = req.params.userId;
  const value = [userId];
  const query = `SELECT * , usersFavoriteJobs.id FROM usersFavoriteJobs INNER JOIN jobs ON usersFavoriteJobs.jobId = jobs.id
        INNER JOIN companies ON jobs.companyId = companies.id WHERE usersFavoriteJobs.userId=$1 AND usersFavoriteJobs.is_deleted=0;`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: "User Favorite Jobs",
          result: result.rows,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: "No User Favorite Jobs founded",
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

const jobsSearch = (req, res) => {
  const searchWord1 = req.params.search.toLowerCase();
  const value = [`%${searchWord1}%`];
  const query = `SELECT * , jobs.id FROM jobs INNER JOIN companies ON jobs.companyId=companies.id WHERE (LOWER(jobTitle) LIKE $1 OR LOWER(jobdescription) LIKE $1 OR jobType LIKE $1 OR jobRole LIKE $1 OR jobRequirements LIKE $1) AND (jobs.is_deleted=0) ;`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: "Searched Jobs",
          result: result.rows,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: "No related Jobs founded",
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
const basel = async()=>{

  try{
   
  }
  catch{

  }
}
const jobsSearchByCompanyIndustry = (req, res) => {
  const searchWord2 = req.params.searchIndustry;
  const value = [`%${searchWord2}%`];
  const query = `SELECT *, jobs.id FROM jobs INNER JOIN companies ON jobs.companyId=companies.id WHERE companies.industry LIKE $1 AND jobs.is_deleted=0 ;`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          massage: "Searched Jobs",
          result: result.rows,
        });
      } else {
        res.status(200).json({
          success: true,
          massage: "No related Jobs founded",
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
module.exports = {
  addNewJob,
  getAllJobs,
  jobApply,
  addFavJob,
  getUserAppliedJobs,
  getUserFavoriteJobs,
  deleteJobById,
  updateJobById,
  jobsSearch,
  deleteJobApplication,
  deleteFavoriteJob,
  getCompanyJobs,
  getCompanyAppliedJobs,
  jobsSearchByCompanyIndustry
};

/*SELECT * FROM users
WHERE gender LIKE 'male';*/

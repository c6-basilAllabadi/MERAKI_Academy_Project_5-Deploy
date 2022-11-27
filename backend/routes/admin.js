const express = require("express");
const AdminRouter = express.Router();

const {getAllCompanies,getAllUsers,getAllJobs,deleteJob,deleteUser,deleteCompany }= require("../controllers/Admin")

AdminRouter.get('/companies',getAllCompanies)
AdminRouter.get('/users',getAllUsers)
AdminRouter.get('/jobs',getAllJobs)
AdminRouter.put('/jobs/:id',deleteJob)
AdminRouter.put('/users/:id',deleteUser)
AdminRouter.put('/companies:id',deleteCompany)





module.exports = AdminRouter;
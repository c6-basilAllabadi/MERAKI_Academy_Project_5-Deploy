const express = require("express");

const { addNewJob, getAllJobs, jobApply, addFavJob, getUserAppliedJobs, getUserFavoriteJobs,deleteJobById,updateJobById, jobsSearch,deleteJobApplication,deleteFavoriteJob, getCompanyJobs,getCompanyAppliedJobs, jobsSearchByCompanyIndustry} = require("../controllers/jobs");
const authentication =require("../../backend/middlewares/authentication")
const jobsRouter = express.Router();

jobsRouter.post("/:companyId",authentication, addNewJob);
jobsRouter.get('/',getAllJobs)
jobsRouter.get('/:companyId',getCompanyJobs)
jobsRouter.post("/jobapply/:userId",authentication,jobApply);
jobsRouter.post("/favjobs/:userId",authentication,addFavJob)
jobsRouter.delete('/:id',authentication,deleteJobById)
jobsRouter.put('/:id',authentication,updateJobById)
jobsRouter.get("/jobapply/:userId",getUserAppliedJobs)
jobsRouter.get("/jobapplies/:companyId",getCompanyAppliedJobs)
jobsRouter.get("/favjobs/:userId",getUserFavoriteJobs)
jobsRouter.get('/search/:search',jobsSearch)
jobsRouter.get('/Industrysearch/:searchIndustry',jobsSearchByCompanyIndustry)
jobsRouter.delete('/jobapply/:id',authentication,deleteJobApplication)
jobsRouter.delete('/favjobs/:id',authentication,deleteFavoriteJob)
module.exports = jobsRouter;

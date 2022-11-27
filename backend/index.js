const express = require("express");
require("dotenv").config();
const cors = require("cors");
const registerUserRouter = require("./routes/registerUser");
const loginUserRouter = require("./routes/loginUsers");
const registerCompanyRouter = require("./routes/registerCompany");
const loginCompanyRouter = require("./routes/loginCompany");
const jobsRouter = require("./routes/jobs");
const usersRouter = require("./routes/users");
const companiesRouter = require("./routes/companies");
const AdminRouter =require("./routes/admin");
const messengerRouter = require("./routes/messenger")

require("./models/db");


const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use('/register/users',registerUserRouter)
app.use('/login/users',loginUserRouter)
app.use('/register/companies', registerCompanyRouter)
app.use('/login/companies',loginCompanyRouter)
app.use('/jobs',jobsRouter)
app.use('/users',usersRouter)
app.use('/companies',companiesRouter)
app.use('/admin',AdminRouter)
app.use("/messenger", messengerRouter);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
require("./socket");

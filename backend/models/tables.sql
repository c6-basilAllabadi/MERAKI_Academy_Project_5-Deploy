CREATE TABLE users (
id  SERIAL PRIMARY KEY,
email VARCHAR(255),
password  VARCHAR(255),
fullName  VARCHAR(255),
dateOfBirth  DATE,
gender  VARCHAR(255),
isCompleted SMALLINT DEFAULT 0,
phoneNumber VARCHAR(255),
maritalStatus  VARCHAR(255),
citizenships  VARCHAR(255),
whereDoYouLive  VARCHAR(255),
residencyStatus  VARCHAR(255),
yearsOfExperience INT ,
recentJobTitle  VARCHAR(255),
recentJobFunction  VARCHAR(255),
industryOfRecentJob   VARCHAR(255) ,         
languages  VARCHAR(255 ),
skills  TEXT,
educationLevel  VARCHAR(255),
major  VARCHAR(255),
educationalInstituteName  VARCHAR(255),
userImage TEXT,
cv TEXT,
is_deleted SMALLINT DEFAULT 0
)
;

CREATE TABLE companies (
id  SERIAL PRIMARY KEY,
companyName VARCHAR(255),
industry VARCHAR(255),
numberOfEmployees INT,
country VARCHAR(255),
city VARCHAR(255),
contactPerson VARCHAR(255),
phoneNumber VARCHAR(255),
email VARCHAR(255),
password VARCHAR(255),
companyWebsite VARCHAR(255),
ceo VARCHAR(255),
workingHours VARCHAR(255),
weekends  VARCHAR(255) ,
lunchBreak VARCHAR(255),
companyOverview TEXT,
companyLogo TEXT,
officeLocation  VARCHAR(255),
is_deleted SMALLINT DEFAULT 0

)
;

CREATE TABLE jobs (
id SERIAL PRIMARY KEY,
companyId INT,
jobTitle VARCHAR(255),
expiryDate DATE,
createdAt TIMESTAMP DEFAULT NOW (),
jobLocation  VARCHAR(255),
careerLevel VARCHAR(255),
jobType VARCHAR(255),
jobRole VARCHAR(255),
yearsOfExperience INT,
countryOfCitizenship  VARCHAR(255),
countryOfResidence VARCHAR(255),
salary INT,
numberOfHires INT,
jobDescription TEXT,
language  VARCHAR(255),
jobRequirements  TEXT,
is_deleted SMALLINT DEFAULT 0,
FOREIGN KEY (companyId) REFERENCES  companies(id)

);

CREATE TABLE usersAppliedJobs (
id SERIAL PRIMARY KEY,
userId INT,
jobId INT,
FOREIGN KEY (userId) REFERENCES  users(id),
FOREIGN KEY (jobId) REFERENCES jobs(id),
is_deleted SMALLINT DEFAULT 0
);


CREATE TABLE usersFavoriteJobs (
id SERIAL PRIMARY KEY,
userId INT,
jobId INT,
FOREIGN KEY (userId) REFERENCES  users(id),
FOREIGN KEY (jobId) REFERENCES jobs(id),
is_deleted SMALLINT DEFAULT 0
);


CREATE TABLE companiesFavoriteUsers (
id SERIAL PRIMARY KEY,
companyId INT,
userId INT,
FOREIGN KEY (companyId) REFERENCES companies(id),
FOREIGN KEY (userId) REFERENCES  users(id),
is_deleted SMALLINT DEFAULT 0
);





CREATE TABLE conversations (
id SERIAL PRIMARY KEY,
userId INT,
companyId INT,
message TEXT,
sender Varchar(255),
image Varchar(255),
FOREIGN KEY (userId) REFERENCES  users(id),
FOREIGN KEY (companyId) REFERENCES companies(id),
is_deleted SMALLINT DEFAULT 0
);
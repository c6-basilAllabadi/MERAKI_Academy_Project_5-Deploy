import { configureStore } from "@reduxjs/toolkit";
import usersAuth from "./reducers/usersAuth";
import CompaniesAuth from "./reducers/CompaniesAuth";
import fav from "./reducers/fav/fav";
import users from "./reducers/Users/users";
import companies from "./reducers/Companies/companies";
import admin from "./reducers/Admin/admin";
import messenger from "./reducers/Messenger/messenger";

export default configureStore({
  reducer: {
    usersAuth: usersAuth,
    CompaniesAuth: CompaniesAuth,
    fav: fav,
    users: users,
    companies: companies,
    admin: admin,
    messenger: messenger,
  },
});

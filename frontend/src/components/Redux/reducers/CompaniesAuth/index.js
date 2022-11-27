import { createSlice } from "@reduxjs/toolkit";
const CompaniesAuthSlice = createSlice({
  name: "CompaniesAuth",
  initialState: {
    token: localStorage.getItem("token") || null,
    companyId: localStorage.getItem("companyId") || null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      console.log(state.token);
      console.log(state.isLoggedIn);
      localStorage.setItem("token", JSON.stringify(state.token));
    },
    setCompanyId: (state, action) => {
      state.companyId = action.payload;
      localStorage.setItem("companyId", JSON.stringify(state.companyId));
    },
    setLogout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      localStorage.clear();
    },
  },
});

export const { setLogin, setLogout, setCompanyId } = CompaniesAuthSlice.actions;
export default CompaniesAuthSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const adminSlice = createSlice({
  name: "admin",
  initialState: {
   users: [],
    companies: [],
    jobs: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setJobs: (state, action) => {
      state.jobs=(action.payload);
    },
    setDeleteUser: (state, action) => {
      state.users = state.users.filter((elem, index) => {
        return elem.id != action.payload;
      });
    },
    setDeleteJob: (state, action) => {
      state.jobs = state.jobs.filter((elem, index) => {
        return elem.id != action.payload;
      });
    },
    setDeleteCompany: (state, action) => {
        state.companies = state.companies.filter((elem, index) => {
          return elem.id != action.payload;
        });
      },
  },
});

export const {
    setUsers,
    setCompanies,
    setJobs,
    setDeleteUser,
    setDeleteJob,
    setDeleteCompany
} = adminSlice.actions;
export default adminSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  filteredJobs: [],
  initialized: false,
};

const jobSlice = createSlice({
  name: "jobSlice",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      (state.jobs = action.payload),
        (state.initialized = true),
        (state.filteredJobs = action.payload);
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    filterBySearch: (state, action) => {
      const query = action.payload.toLowerCase();
      const filtered = state.jobs.filter((job) =>
        job.company.toLowerCase().includes(query)
      );
      state.filteredJobs = filtered;
    },
    filterByStatus: (state, action) => {
      state.filteredJobs = state.jobs.filter(
        (job) => job.status === action.payload
      );
    },
    filterByType: (state, action) => {
      state.filteredJobs = state.jobs.filter(
        (job) => job.type === action.payload
      );
    },
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          state.filteredJobs.sort((a, b) => {
            if (a.company < b.company) return -1;
            if (a.company > b.company) return 1;
            return 0;
          });
          break;
        case "z-a":
          state.filteredJobs.sort((a, b) => {
            if (a.company < b.company) return 1;
            if (a.company > b.company) return -1;
            return 0;
          });
          break;

        case "The latest":
          state.filteredJobs.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          break;

        case "The earliest":
          state.filteredJobs.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          break;
        default:
          break;
      }

      return state;
    },
    clearFilters: (state) => {
      state.filteredJobs = state.jobs;
    },
  },
});

export const {
  setJobs,
  addJob,
  filterBySearch,
  filterByStatus,
  filterByType,
  sortJobs,
  clearFilters,
} = jobSlice.actions;

export default jobSlice.reducer;

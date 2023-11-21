import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "../redux/jobSlice";
import Filter from "../components/Filter";

const JobList = () => {
  const state = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3030/jobs", { timeout: 5000 })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => {
        if ((err.code = "ECONNABORTED")) {
          alert("Your connection has timed out.");
        }
      });
  }, []);

  return (
    <div>
      <Filter />
      <h3 className="job-count">
        You are viewing all ({state?.jobs.length} ) jobs out of the available (
        {state?.filteredJobs.length} ) .
      </h3>
      <section className="list-section">
        {!state.initialized ? (
          <p>Loading...</p>
        ) : (
          state.filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="head">
                <div className="letter">
                  <p>{job.company[0]}</p>
                </div>
                <div className="info">
                  <p>{job.title}</p>
                  <p>{job.company}</p>
                </div>
              </div>
              <div className="body">
                <div className="field">
                  <img src="/images/map.png" />
                  <p>{job.location}</p>
                </div>
                <div className="field">
                  <img src="/images/calendar.png" />
                  <p>{job.date}</p>
                </div>
                <div className="field">
                  <img src="/images/bag.png" />
                  <p>{job.type}</p>
                </div>
                <div className="status">
                  <span className={job.status}>{job.status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default JobList;

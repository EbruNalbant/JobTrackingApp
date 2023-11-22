import { useDispatch } from "react-redux";
import { sortOptions, typeOptions, statusOptions } from "../constant";
import {
  filterBySearch,
  filterByStatus,
  filterByType,
  sortJobs,
  clearFilters,
} from "../redux/jobSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    dispatch(filterBySearch(e.target.value));
  };
  const handleStatus = (e) => {
    dispatch(filterByStatus(e.target.value));
  };

  const handleType = (e) => {
    dispatch(filterByType(e.target.value));
  };

  const handleSort = (e) => {
    dispatch(sortJobs(e.target.value));
  };
  return (
    <section className="filter-sec">
      <h2>Filter Form</h2>
      <form>
        <div className="field">
          <label>Search</label>
          <input type="text" onChange={handleSearch} />
        </div>
        <div className="field">
          <label>Status</label>
          <select onChange={handleStatus}>
            <option hidden>Choose</option>
            {statusOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Type</label>
          <select onChange={handleType}>
            <option hidden>Choose</option>
            {typeOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Order</label>
          <select onChange={handleSort}>
            {sortOptions.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={() => dispatch(clearFilters())}>
          Clear the Filters
        </button>
      </form>
    </section>
  );
};

export default Filter;

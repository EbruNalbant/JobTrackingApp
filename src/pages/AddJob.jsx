import { useDispatch } from "react-redux";
import { statusOptions, typeOptions } from "../constant";
import { v4 } from "uuid";
import axios from "axios";
import { addJob } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // creating a data of form
    const formData = new FormData(e.target);
    // creating a object from form data
    const dataObj = Object.fromEntries(formData);
    // adding id to object
    dataObj.id = v4();
    // creating the add date
    dataObj.date = new Date().toLocaleDateString();
    // updating the API
    axios.post("http://localhost:3030/jobs", dataObj).then(() => {
      dispatch(addJob(dataObj));
      // directing to home page
      navigate("/");
      // show the notification
      toast.success("Added successfully", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    });
  };

  return (
    <div className="add-sec">
      <h2>Add a New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Position</label>
          <input name="position" type="text" />
        </div>
        <div className="field">
          <label>Company</label>
          <input name="company" type="text" />
        </div>
        <div className="field">
          <label>Location</label>
          <input name="location" type="text" />
        </div>
        <div className="field">
          <label>Status</label>
          <select name="status">
            {statusOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Type</label>
          <select name="type">
            {typeOptions.map((opt, i) => (
              <option key={i}>{opt.label}</option>
            ))}
          </select>
        </div>
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddJob;

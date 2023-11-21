import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>Job Tracking</h2>
      <div>
        <NavLink to="/">Job List</NavLink>
        <NavLink to={"/add-job"}>Add Job</NavLink>
      </div>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./SearchBar.css";
export const Navbar = () => {
  return (
    <div className="navbar">
      <input placeholder="Search your photos"></input>
      <Button left="550" top="25px">
        <Link to="/">Gazou</Link>
      </Button>
      <Button left="1000px" top="25px">
        <Link to="/auth">Login/register</Link>
      </Button>
      <Button left="1270px" top="25px">
        Upload
      </Button>
      <hr />
    </div>
  );
};

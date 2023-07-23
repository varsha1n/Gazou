import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./SearchBar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <input placeholder="Search your photos" id="search" />
      <Button left="-110px" top="10px">
        <Link to="/">Gazou</Link>
      </Button>
      {!cookies.access_token ? (
        <Button left="-70px" top="10px">
          <Link to="/auth">Login/register</Link>
        </Button>
      ) : (
        <Button left="0px" top="10px" onClick={logout}>
          Logout
        </Button>
      )}

      <Button left="50px" top="10px">
        Upload
      </Button>
      <hr />
    </div>
  );
};

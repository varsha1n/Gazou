import { useState } from "react";
import { Form } from "../components/Form.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

export default Auth;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      if (response.data.message === "Username or Password Is Incorrect") {
        alert("Invalid username or password");
      } else if (response.data.message === "user doesnt exist") {
        alert("User does not exist");
      } else {
        setCookies("access_token", response.data.token); //If the login is successful, the access token is stored as a cookie
        window.localStorage.setItem("username", response.data.username); // Set username in local storage
        navigate("/");
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {error && alert(error)}
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        left="0px"
        top="0px"
        float="left"
        onSubmit={onSubmit}
      />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });

      if (response.data.message === "user already exists") {
        alert("Username already exists");
      } else {
        alert("Registration Completed! Please Login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {error && alert(error)}
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        left="0px"
        top="0px"
        float="right"
        onSubmit={onSubmit}
      />
    </div>
  );
};

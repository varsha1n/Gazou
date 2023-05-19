import { useState } from "react";
import { Form } from "../components/Form.js";
import axios from "axios";
import { useCookies } from "react-cookie"; //converts tokens from backend into cookies
import { useNavigate } from "react-router-dom"; // whenever u want to redirect page based on command . used mostly with react-router-dom
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

  const [, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      setCookies("access_token", response.data.token); // setting the acess_tokenvalue to (res.data.token)=user_id
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      left="100px"
      top="430px"
      float="left"
      onSubmit={onSubmit}
    />
  );
};
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed ! Please Login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      left="1200px"
      top="430px"
      float="right"
      onSubmit={onSubmit}
    />
  );
};

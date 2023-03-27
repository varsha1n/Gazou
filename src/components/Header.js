import { Nav, Logo } from "./styles/Header.styled";
import { Button } from "./Button";
import "./SearchBar.css";
export default function Header() {
  return (
    <>
      <Nav>
        <h1>Gazou</h1>
        <Button left="1333px" top="25px">
          Login
        </Button>
        <Button left="1075px" top="25px">
          Upload
        </Button>
        <Logo src="/images/icon.png" alt="" />
        <input placeholder="Search your photos"></input>
      </Nav>
      <hr top="50px"></hr>
    </>
  );
}

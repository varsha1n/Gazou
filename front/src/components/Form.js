import { Button } from "../components/Button.js";

export const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  left,
  top,
  float,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <form id={float} onSubmit={onSubmit}>
        <h2>{label}</h2>
        <div className="form-group">
          <label htmlFor="username" class="wordscss">
            Username
          </label>
          <br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" class="wordscss">
            Password
          </label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button left={left} top={top}>
          Submit
        </Button>
      </form>
    </div>
  );
};

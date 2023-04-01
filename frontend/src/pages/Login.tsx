import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";


const Login: FunctionComponent = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const onLogin = (event: SubmitEvent) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const email = data.get("email").toString();
    const password = data.get("password").toString();

    auth.login(email, password).then(() => {
      navigate("/");
    });
  };
  return (<>
    <h1>Login</h1>
    <form onSubmit={onLogin}>
      <input name="email" placeholder="email" type="email" />
      <input name="password" placeholder="haslo" type="password" />
      <button type="submit">Zaloguj</button>
    </form>
  </>);
};

export default Login;

import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import "./Login.css";
import { toast } from "react-toastify";

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
    }).catch((res) => toast.error(res.response?.data.message ?? "Proszę spróbować później"));
  };
  return (<>
    <main className="main-login">
      <div className="login-form-container">
        <h1 className="login-form-title">Logowanie</h1>
        <div className="login-form-fields">
          <form onSubmit={onLogin}>
            <div className="login-form-field">
              <input className="login-input" name="email" placeholder="Email" type="email" />
            </div>
            <div className="login-form-field">
              <input className="login-input" name="password" placeholder="Haslo" type="password" />
            </div>
            <div className="login-form-button">
              <button className="button" type="submit">Zaloguj</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </>);
};

export default Login;

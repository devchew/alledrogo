import { useState } from "react";

import { changePassword } from "../../api/auth";

import "./EditPassword.css";
import { toast } from "react-toastify";

export const EditPassword = () => {


  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setErrorMessages([]);

    const data = new FormData(event.target as HTMLFormElement);
    const oldPassword = data.get("oldPassword").toString();
    const newPassword = data.get("newPassword").toString();
    const reNewPassword = data.get("reNewPassword").toString();

    if (newPassword !== reNewPassword) {
      setErrorMessages(["Podane nowe hasło różni się od powtórzonego."]);
      return;
    }

    changePassword({
      oldPassword,
      newPassword
    }).then(() => toast.success("Hasło zostało zmienione!")).catch((response) => {
      if (response.response?.data.message) {
        const message = response.response?.data.message;
        const isArray = Array.isArray(message);
        isArray ? setErrorMessages(message) : toast.error(message);
      } else toast.error("Przepraszamy. Proszę spróbować pożniej");
    });
  };

  return <div className="edit-password">
    <h1 className="register-form-title">Zmiana hasła</h1>
    <div className="profile-info-form-fields register-form-fields">
      <form onSubmit={onSubmit}>
        {errorMessages.map(error => <div style={{ color: "red" }}>{error}</div>)}
        <div className="register-form-field">
          <input className="register-input" name="oldPassword"
                 placeholder="Stare hasło" type="text" />
        </div>
        <div className="register-form-field">
          <input className="register-input" name="newPassword"
                 placeholder="nowe hasło" type="text" />
        </div>
        <div className="register-form-field">
          <input className="register-input" name="reNewPassword"
                 placeholder="powtórz nowe hasło" type="text" />
        </div>
        <div className="register-form-button">
          <button className="button" type="submit">Zmień hasło</button>
        </div>
      </form>
    </div>
  </div>;
};


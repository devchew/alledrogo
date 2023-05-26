import { useAuth } from "../../context/auth";
import { editUser } from "../../api/user";
import { useState } from "react";

import './EditProfile.css'
export const EditProfile = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, setUser } = useAuth();
  if(!user?.firstName) return null

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  console.log(typeof []);
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setIsDisabled(true);


    const data = new FormData(event.target as HTMLFormElement);
    const email = data.get("email").toString();
    const city = data.get("city").toString();
    const street = data.get("street").toString();
    const firstName = data.get("firstName").toString();
    const lastName = data.get("lastName").toString();

    editUser({
      email,
      city,
      firstName,
      lastName,
      street
    }).then((res) => setUser(res?.data)).catch((response) => {
      if (response.response?.data.message) {
        const message = response.response?.data.message
        const isArray = Array.isArray(message)
        setErrorMessages(isArray ? message : [message]);
      } else setErrorMessages(['Ops. Coś poszło nie tak spróbuj ponownie później'])
    });
  };
  return (
    <div className="profile-info">
      <h1 className="register-form-title">Moje konto</h1>
      <div className="profile-info-form-fields register-form-fields">
        <form onSubmit={onSubmit}>
          {errorMessages.map(error => <div style={{ color: "red" }}>{error}</div>)}
          <div className="register-form-field">
            <input defaultValue={user.firstName} disabled={isDisabled} className="register-input" name="firstName"
                   placeholder="Imię" type="text"/>
          </div>
          <div className="register-form-field">
            <input defaultValue={user.lastName} disabled={isDisabled} className="register-input" name="lastName"
                   placeholder="Nazwisko" type="text"/>
          </div>
          <div className="register-form-field">
            <input defaultValue={user.email} disabled={isDisabled} className="register-input" name="email"
                   placeholder="Email" type="email"/>
          </div>
          <div className="register-form-field">
            <input defaultValue={user.city} disabled={isDisabled} className="register-input" name="city"
                   placeholder="Miasto" type="text"/>
          </div>
          <div className="register-form-field">
            <input defaultValue={user.street} disabled={isDisabled} className="register-input" name="street"
                   placeholder="Ulica" type="text"/>
          </div>
          <div className="profile-form register-form-button">
            {!isDisabled && <button className="button button--save" type="submit">Zapisz</button>}
            {isDisabled &&
                <button onClick={() => setIsDisabled(false)} className="button" type="button">Edytuj</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

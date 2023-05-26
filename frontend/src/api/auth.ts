import { Endpoint_Auth_ChangePassword, Endpoint_Auth_Login, Endpoint_Auth_Register, http } from "./http";

interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city: string;
  street: string;
}

interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export const registerUser = (user: UserRegister) => http.post(Endpoint_Auth_Register(), user);
export const changePassword = (obj: ChangePassword) => http.patch(Endpoint_Auth_ChangePassword(), obj);

export const logIn = (email: string, password: string) =>
  http.post<{ accessToken: string }>(Endpoint_Auth_Login(), {
    email,
    password
  }).then((response) => {
    if (!response.data.accessToken) {
      throw new Error("Login failed");
    }
    //zapisz token do sessions storage
    http.auth(response.data.accessToken);
    return response.data.accessToken;
  });

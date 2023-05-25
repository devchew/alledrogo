import { Endpoint_User, Endpoint_User_Profile, http } from "./http";

interface EditUser {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  street: string;
}
export const getProfile = () => http.get(Endpoint_User_Profile());
export const editUser = (user: EditUser) => http.patch(Endpoint_User(), user);

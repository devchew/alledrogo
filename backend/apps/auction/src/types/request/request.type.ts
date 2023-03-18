export type RequestUser = { id: string; authorization: string };
export type AuthorisedRequest = {
  user: RequestUser;
};

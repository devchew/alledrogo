import axios, { AxiosInstance } from "axios";

export const apiGateway = "http://localhost:4000/api";

export const Endpoint_Auth_Register = () => `auth/register`;
export const Endpoint_Auth_Login = () => `auth/login`;
export const Endpoint_Auth_ChangePassword = () => `auth/change-password`;

export const Endpoint_User = () => `user`;
export const Endpoint_User_Profile = () => `user/me`;

export const Endpoint_Auction_All = (sort: "date" | "price" = "date") => `auction?sort=${sort}`;
export const Endpoint_Auction_my = () => `auction/my`;
export const Endpoint_Auction_win = () => `auction/win`;
export const Endpoint_Auction_bid = () => `auction/bid`;
export const Endpoint_Auction_Single = (id: string) => `auction/${id}`;
export const Endpoint_Auction_Create = () => `auction`;
export const Endpoint_Auction_Bid = (id: string) => `auction/${id}/bid`;


class HTTP {

  private http: AxiosInstance = this.createNewInstance(sessionStorage.getItem("auth"));
  public get = this.http.get;
  public post = this.http.post;
  public put = this.http.put;
  public delete = this.http.delete;
  public patch = this.http.patch;

  public auth(token: string) {
    this.http = this.createNewInstance(token);
    window.location.replace("/");
  }

  private createNewInstance(token?: string) {
    return axios.create({
      baseURL: apiGateway,
      timeout: 1000,
      headers: {
        accept: "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
      }
    });
  }

}

export const http = new HTTP();

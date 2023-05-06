import { Endpoint_Auction_All, Endpoint_Auction_Create, Endpoint_Auction_Single, http } from "./http";

export interface Auction {
  id: string;
  createdAt: Date;
  title: string;
  image: string;
  endDate: Date;
  bids: string;
  status?: boolean;
  price: number;
  shortDescription: string;
  longDescription: string;
}


export const getAllAuctions = () => http.get<Auction[]>(Endpoint_Auction_All());

export const getSingleAuction = (id: string) => http.get<Auction>(Endpoint_Auction_Single(id));

export const createAuction = (auction: {
  "title": Auction["title"],
  "shortDescription": Auction["shortDescription"],
  "longDescription": Auction["longDescription"],
  "image": Auction["image"],
  "price": Auction["price"]
}) => http.post<Auction>(Endpoint_Auction_Create(), auction);

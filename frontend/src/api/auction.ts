import {
  Endpoint_Auction_All,
  Endpoint_Auction_bid,
  Endpoint_Auction_Bid,
  Endpoint_Auction_Create,
  Endpoint_Auction_my,
  Endpoint_Auction_Single,
  Endpoint_Auction_win,
  http
} from "./http";

export interface Bid {
  date: Date;
  name: string;
  price: number;
  userId: string;
}

export interface Auction {
  id: string;
  winner: string | null;
  createdAt: Date;
  title: string;
  image: string;
  endDate: Date;
  bids: Bid[];
  status?: boolean;
  price: number;
  shortDescription: string;
  longDescription: string;
  myAuction: boolean;
}


export const getAllAuctions = () => http.get<Auction[]>(Endpoint_Auction_All());
export const getMyAuctions = () => http.get<Auction[]>(Endpoint_Auction_my());
export const getMyWinAuctions = () => http.get<Auction[]>(Endpoint_Auction_win());
export const getBidAuctions = () => http.get<Auction[]>(Endpoint_Auction_bid());

export const getSingleAuction = (id: string) => http.get<Auction>(Endpoint_Auction_Single(id));

export const createAuction = (auction: {
  "title": Auction["title"],
  "shortDescription": Auction["shortDescription"],
  "longDescription": Auction["longDescription"],
  "image": Auction["image"],
  "price": Auction["price"]
}) => http.post<Auction>(Endpoint_Auction_Create(), auction);

export const bidAuction = (id: Auction["id"], price: Auction["price"]) => http.post(Endpoint_Auction_Bid(id), { price });

export const deleteAuction = (id: string) => http.delete<Auction>(Endpoint_Auction_Single(id));

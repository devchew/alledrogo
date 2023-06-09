import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Auction, getBidAuctions } from "../../api/auction";
import { AuctionTable } from "../uiElements/auctionTable/AuctionTable";

import "./MyAuctions.css";

export const BidAuctions = () => {
  const [auctions, setMyAuctions] = useState<Auction[]>([]);


  useEffect(() => {
    getBidAuctions().then((auctions) => {
      setMyAuctions(auctions.data);
    }).catch(() => toast.error("Przepraszamy. Proszę spróbować pożniej"));
  }, []);


  return <div className="my-auctions">
    <h1>Moje licytacje</h1>
    <AuctionTable auctions={auctions} />
  </div>;
};

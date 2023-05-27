import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Auction, getMyAuctions } from "../../api/auction";
import { AuctionTable } from "../uiElements/auctionTable/AuctionTable";

import "./MyAuctions.css";

export const MyAuctions = () => {
  const [auctions, setMyAuctions] = useState<Auction[]>([]);


  useEffect(() => {
    getMyAuctions().then((auctions) => {
      setMyAuctions(auctions.data);
    }).catch(() => toast.error("Przepraszamy. Proszę spróbować pożniej"));
  }, []);


  return <div className="my-auctions">
    <h1>Moje aukcje</h1>
    <AuctionTable auctions={auctions} />
  </div>;
};

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Auction, getMyWinAuctions } from "../../api/auction";
import { AuctionTable } from "../uiElements/auctionTable/AuctionTable";

import "./MyAuctions.css";

export const MyWinAuctions = () => {
  const [auctions, setMyAuctions] = useState<Auction[]>([]);


  useEffect(() => {
    getMyWinAuctions().then((auctions) => {
      setMyAuctions(auctions.data);
    }).catch(() => toast.error("Przepraszamy. Proszę spróbować pożniej"));
  }, []);


  return <div className="my-auctions">
    <h1>Moje wygrane aukcje</h1>
    <AuctionTable auctions={auctions} />
  </div>;
};

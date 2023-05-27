import { toast } from "react-toastify";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Auction, getAllAuctions } from "../api/auction";
import "./Home.css";
import AuctionPreview from "../components/AuctionPreview";
import Heading from "../components/Heading";
import Hero from "../components/Hero";


const Home: FunctionComponent = () => {

  const [auctions, setAuctions] = useState<Auction[]>([]);
  useEffect(() => {
    getAllAuctions().then((auctions) => {
      setAuctions(auctions.data);
    }).catch(() => toast.error("Przepraszamy. Proszę spróbować pożniej"));
  }, []);

  return (<>
    <Hero />
    <Heading>Alledrogo, nasze aukcje</Heading>
    <div className="home-auctions">
      {auctions.map(auction =>
        <div className="home-auctions__item" key={auction.id}>
          <AuctionPreview auction={auction} />
        </div>
      )}
    </div>
  </>);
};

export default Home;

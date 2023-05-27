import { toast } from "react-toastify";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Auction, getAllAuctions } from "../api/auction";
import "./Home.css";
import AuctionPreview from "../components/AuctionPreview";
import Heading from "../components/Heading";
import Hero from "../components/Hero";


const Home: FunctionComponent = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [sort, setSort] = useState<"date" | "price">("date");

  const fetchAuctions = () => {
    getAllAuctions(sort).then((auctions) => {
      setAuctions(auctions.data);
    }).catch(() => toast.error("Przepraszamy. Proszę spróbować pożniej"));
  };

  const changesort = (e) => setSort(e.target.value);

  useEffect(fetchAuctions, [sort]);

  return (<>
    <Hero />
    <Heading>Alledrogo, nasze aukcje</Heading>
    <select className="home-auctions-sort" onChange={changesort}>
      <option value="date">Sortuj po dacie do końca aukcji</option>
      <option value="price">Sortuj po najniższej cenie</option>
    </select>
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

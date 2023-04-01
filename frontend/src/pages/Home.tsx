import React, { FunctionComponent, useEffect, useState } from "react";
import { Auction, getAllAuctions } from "../api/auction";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";


const Home: FunctionComponent = () => {

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const { isAuth } = useAuth();

  useEffect(() => {
    getAllAuctions().then((auctions) => {
      setAuctions(auctions.data);
    });
  }, []);

  return (<>
    <h1>Alledrogo, nasze aukcje {isAuth ? "👍" : "❌"}</h1>
    <ul>
      {auctions.map(auction =>
        <li key={auction.id}><Link to={`/auction/${auction.id}`}>{auction.title}</Link></li>
      )}
    </ul>
  </>);
};

export default Home;

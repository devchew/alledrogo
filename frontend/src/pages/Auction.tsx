import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Auction as AuctionType, getSingleAuction } from "../api/auction";


const Auction: FunctionComponent = () => {
  const [auction, setAuction] = useState<AuctionType>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleAuction(id)
      .then(response => setAuction(response.data))
      .catch(() => navigate("/"));
  }, []);

  if (!auction) {
    return <h1>loading</h1>;
  }

  return (<div>
      <img src={auction.image} alt={auction.title + "image"} />
      <h1>{auction.title}</h1>
      <ul>
        <li>{auction.status}</li>
        <li>{auction.endDate}</li>
        <li>{auction.createdAt}</li>
      </ul>
    </div>
  );
};

export default Auction;

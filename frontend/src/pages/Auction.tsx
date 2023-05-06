import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Auction as AuctionType, getSingleAuction } from "../api/auction";
import "./Auction.css";
import { endDateToRelative } from "../helpers";

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

  return (<div className="auction-page">
      <div className="auction-page__images auction-images">
        <img src={auction.image} alt={auction.title + "image"} className="auction-images__item" />
      </div>
      <div className="auction-page__details auction-details">
        <span
          className="auction-details__status">koniec aukcji: {endDateToRelative(auction.endDate)}</span>
        <span className="auction-details__title">{auction.title}</span>
        <span className="auction-details__price">{auction.price}</span>
        <div className="auction-details__bidding">
          <ul>
            <li>{auction.status}</li>
            <li>{auction.endDate}</li>
            <li>{auction.createdAt}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auction;

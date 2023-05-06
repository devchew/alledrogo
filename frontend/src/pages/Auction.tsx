import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Auction as AuctionType, getSingleAuction } from "../api/auction";
import "./Auction.css";
import { formatRelative } from "date-fns";

const endDateToRelatve = (date: string): string => formatRelative(new Date(date), new Date());

const Auction: FunctionComponent = () => {
  const [auction, setAuction] = useState<AuctionType>(
    //   {
    //   endDate: addDays(new Date(), 34).toISOString(),
    //   title: "Konsola PlayStation 5 z kontrolerem DualSense",
    //   image: "https://picsum.photos/1024/768",
    //   shortDescription: "Nowa konsola PlayStation 5 z kontrolerem DualSense. Wersja z dyskiem twardym o pojemności 825 GB. Kompatybilna z grami z PlayStation 4 i PlayStation 5.",
    //   price: 3600,
    //   createdAt: new Date().toISOString(),
    //   status: true,
    //   id: '123',
    //   longDescription: "Sprzedaję nową konsolę PlayStation 5 wraz z kontrolerem DualSense. Konsola jest fabrycznie nowa i nie została użyta. Jest to wersja z dyskiem twardym o pojemności 825 GB. Konsola jest w pełni kompatybilna z grami z poprzedniej generacji PlayStation 4, a także z wieloma nowymi grami na PlayStation 5.",
    //   bids: "none"
    // }
  );

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
          className="auction-details__status">{auction.status ? endDateToRelatve(auction.endDate) : "Zakończona"}</span>
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

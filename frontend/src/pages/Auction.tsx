import React, { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Auction as AuctionType, bidAuction, getSingleAuction } from "../api/auction";
import "./Auction.css";
import { endDateToRelative } from "../helpers";

const Auction: FunctionComponent = () => {
  const [auction, setAuction] = useState<AuctionType>();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const loadAuction = () => {
    getSingleAuction(id)
      .then(response => setAuction(response.data))
      .catch(() => navigate("/"));
  };

  useEffect(loadAuction, []);

  const onBid = (event: SubmitEvent) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const price = parseInt(data.get("price").toString(), 10);

    bidAuction(auction.id, price)
      .then(() => {
        loadAuction();
        setErrorMessages([]);
        setSuccess(true);
      })
      .catch((response) => {
        if (response.code === 400) {
          loadAuction();
        }
        if (response.code === 401) {
          navigate("/");
        }
        if (response.response.data.message) {
          setErrorMessages([response?.response?.data?.message]);
        }
        loadAuction();
        setSuccess(false);
      });

  };

  if (!auction) {
    return <h1>loading</h1>;
  }

  return (<div className="auction-page">
      <div className="auction-page__images auction-images">
        {auction.image.trim() !== ""
          ? <img src={auction.image} alt={auction.title} className="auction-images__item" />
          : <div className="auction-images__placeholder">{auction.title}</div>
        }
      </div>
      <div className="auction-page__details auction-details">
        <span
          className="auction-details__status">koniec aukcji: {endDateToRelative(auction.endDate)}</span>
        <span className="auction-details__title">{auction.title}</span>
        {errorMessages.length > 0 && errorMessages.map(error => <div style={{ color: "red" }}>{error}</div>)}

        {auction.myAuction ?
          <span className="auction-details__price">
            {auction.price}&nbsp;zł
          </span>
          :
          <form className="auction-details__price auction-bid" onSubmit={onBid}>
            {success && <div className="auction-bid__success">Twoja oferta jest obecnie najwyższa</div>}
            <input
              className="auction-bid__input"
              name="price"
              placeholder="1.00"
              defaultValue={auction.price}
              onChange={() => setErrorMessages([])}
              type="number"
              min={auction.price}
              max="90000.00"
              step="1"
            />&nbsp;zł
            <button type="submit" className="button auction-bid__submit">Podbij</button>
          </form>
        }
        <div className="auction-details__bidding">
          {auction.longDescription}
          <ul>
            {auction.bids.length > 4 ? <>
              <li>{auction.bids[0].price}zł [{auction.bids[0].name}]</li>
              <li>...</li>
              {auction.bids.slice(-3).map(bid => (<li>{bid.price}zł [{bid.name}]</li>))}
            </> : <>
              {auction.bids.map(bid => (<li>{bid.price}zł [{bid.name}]</li>))}
            </>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auction;

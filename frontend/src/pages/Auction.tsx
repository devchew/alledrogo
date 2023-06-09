import React, { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { Auction as AuctionType, bidAuction, deleteAuction, getSingleAuction } from "../api/auction";
import { endDateToRelative } from "../helpers";
import { useAuth } from "../context/auth";

import "./Auction.css";

const Auction: FunctionComponent = () => {
  const [auction, setAuction] = useState<AuctionType>();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { isAuth } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const loadAuction = () => {
    getSingleAuction(id)
      .then(response => setAuction(response.data))
      .catch((response) => {
        const message = response.response?.data.message;
        toast.error(message ?? "Przepraszamy. Proszę spróbować pożniej");
        navigate("/");
      });
  };

  useEffect(loadAuction, []);

  const onBid = (event: SubmitEvent) => {
    event.preventDefault();
    setErrorMessages([]);
    if (!isAuth){
      navigate("/login");
    }

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
        if (response.response?.data.message) {
          const message = response.response?.data.message;
          const isArray = Array.isArray(message);
          isArray ? setErrorMessages(message) : toast.error(message);
        } else toast.error("Przepraszamy. Proszę spróbować pożniej");
        loadAuction();
        setSuccess(false);
      });
  };

  if (!auction) {
    return <h1>loading</h1>;
  }

  return (
    <div className="auction-page">
      <div className="auction-page__images auction-images">
        {auction.image.trim() !== ""
          ? <img src={auction.image} alt={auction.title} className="auction-images__item"/>
          : <div className="auction-images__placeholder">{auction.title}</div>
        }
      </div>
      <div className="auction-page__details auction-details">
        <div className="auction-page__details__bar">
          <span className="auction-details__status">
            koniec aukcji: {endDateToRelative(auction.endDate)}
          </span>
          {auction.myAuction && (
            <>
              <button
                className="auction-details__button auction-details__button--secondary"
                onClick={() => {
                  deleteAuction(auction.id);
                  navigate("/");
                }}
              >
                Usuń
              </button>
              <NavLink to="./edit"
                       className="auction-details__button auction-details__button--secondary">Edytuj</NavLink>
            </>
          )}
        </div>
        <span className="auction-details__title">{auction.title}</span>
        {errorMessages.length > 0 &&
          errorMessages.map((error) => (
            <div style={{ color: "red" }} key={error}>{error}</div>
          ))}

        {auction.myAuction ? (
          <span className="auction-details__price">
            {auction.price}&nbsp;zł
          </span>
        ) : (
          <form className="auction-details__price auction-bid" onSubmit={onBid}>
            {success && (
              <div className="auction-bid__success">
                Twoja oferta jest obecnie najwyższa
              </div>
            )}
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
            />
            &nbsp;zł
            <button type="submit" className="button auction-bid__submit">
              Podbij
            </button>
          </form>
        )}
        <div className="auction-details__description">
          {auction.longDescription}
        </div>
        <div className="auction-details__bidding">
          <h3 className="auction-details__bidding-title">historia licytacji:</h3>
          <ul>
            {auction.bids.length > 4 ? (
              <>
                <li>
                  {auction.bids[0].price}zł [{auction.bids[0].name}]
                </li>
                <li>...</li>
                {auction.bids.slice(-3).map((bid) => (
                  <li key={bid.userId + "_" + bid.price}>
                    {bid.price}zł [{bid.name}]
                  </li>
                ))}
              </>
            ) : (
              <>
                {auction.bids.map((bid) => (
                  <li key={bid.userId + "_" + bid.price}>
                    {bid.price}zł [{bid.name}]
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Auction;

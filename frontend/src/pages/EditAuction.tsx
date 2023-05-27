import React, { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import Heading from "../components/Heading";
import { Auction as AuctionType, getSingleAuction, updateAuction } from "../api/auction";
import { endDateToRelative } from "../helpers";

import "./EditAuction.css";
import { useAuth } from "../context/auth";

const CreateAuction: FunctionComponent = () => {
  const [auction, setAuction] = useState<AuctionType>();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isAuth } = useAuth();

  const chanegImagePreview = (event) => {
    setImagePreview(event.target.value || undefined);
  };
  const onAdd = (event: SubmitEvent) => {
    event.preventDefault();
    setErrorMessages([]);

    const data = new FormData(event.target as HTMLFormElement);
    const image = data.get("image").toString();
    const longDescription = data.get("longDescription").toString();
    const shortDescription = data.get("shortDescription").toString();
    const title = data.get("title").toString();

    updateAuction({
      id,
      image,
      longDescription,
      shortDescription,
      title
    }).then((response) => {
      toast.success("Aukcja została zapisana");
      navigate(`/auction/${response.data.id}`);
    }).catch((response) => {
      if (response.code === 401) {
        navigate("/");
      }
      if (response.response?.data.message) {
        const message = response.response?.data.message;
        const isArray = Array.isArray(message);
        isArray ? setErrorMessages(message) : toast.error(message);
      } else toast.error("Przepraszamy. Proszę spróbować pożniej");
    });
  };

  const loadAuction = () => {
    getSingleAuction(id)
      .then(response => {
        if (!response.data.myAuction) {
          navigate("/");
        }
        setAuction(response.data);
        response.data.image && setImagePreview(response.data.image);
      })
      .catch((response) => {
        const message = response.response?.data.message;
        toast.error(message ?? "Przepraszamy. Proszę spróbować pożniej");
        navigate("/");
      });
  };

  useEffect(loadAuction, []);

  if (!auction) {
    return (<h1>wczytuję...</h1>);
  }

  return (
    <>
      <Heading>Edytujesz aukcję</Heading>
      {errorMessages.length > 0 && <Heading>
        {errorMessages.map(error => <div style={{ color: "red" }}>{error}</div>)}
      </Heading>}
      <form onSubmit={onAdd}>
        <div className="edit-auction-page">
          <div className="edit-auction-page__image"
               style={imagePreview && { backgroundImage: `url(${imagePreview})` }}>
            <span className="edit-auction-page__image-backdrop">
              URL obrazka:&nbsp;
              <input name="image" placeholder="image" type="text" onChange={chanegImagePreview}
                     defaultValue={auction.image} />
            </span>
          </div>
          <div className="edit-auction-page__details edit-auction-details">
            <span
              className="edit-auction-details__status">koniec aukcji: {endDateToRelative(new Date(auction.endDate).toISOString())}</span>
            <span className="edit-auction-details__title">
              <input name="title" placeholder="Tytuł" type="text" minLength="3" maxLength="100" required
                     defaultValue={auction.title} /></span>
            <span className="edit-auction-details__price">
              {auction.price}&nbsp;zł
            </span>
            <span className="edit-auction-details__shortdescription">
              <label>Krótki opis</label>
              <textarea name="shortDescription" id="shortDescription" rows="4" minLength="5" maxLength="250"
                        defaultValue={auction.shortDescription}
                        required></textarea>
            </span>
            <span className="edit-auction-details__description">
              <label>Opis</label>
              <textarea name="longDescription" id="longDescription" rows="10" minLength="5" maxLength="2500"
                        defaultValue={auction.longDescription}
                        required></textarea>
            </span>
            <div className="edit-auction-details__bidding">
              <button type="submit" className="button">Zapisz</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateAuction;

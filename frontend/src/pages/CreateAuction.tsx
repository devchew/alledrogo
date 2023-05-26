import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuction } from "../api/auction";
import Heading from "../components/Heading";
import "./CreateAuction.css";
import { endDateToRelative } from "../helpers";

const CreateAuction: FunctionComponent = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const chanegImagePreview = (event) => {
    setImagePreview(event.target.value || undefined);
  };
  const navigate = useNavigate();

  const today = new Date(); // Now
  const endDate = new Date(today.setDate(today.getDate() + 30)).toISOString();

  const onAdd = (event: SubmitEvent) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const image = data.get("image").toString();
    const longDescription = data.get("longDescription").toString();
    const price = parseInt(data.get("price").toString(), 10);
    const shortDescription = data.get("shortDescription").toString();
    const title = data.get("title").toString();

    createAuction({
      image,
      longDescription,
      price,
      shortDescription,
      title
    }).then((response) => {
      navigate(`/auction/${response.data.id}`);
    }).catch((response) => {
      if (response.code === 401) {
        navigate("/");
      }
      if (response.response?.data.message) {
        const message = response.response?.data.message
        const isArray = Array.isArray(message)
        setErrorMessages(isArray ? message : [message]);
      } else setErrorMessages(['Ops. Coś poszło nie tak spróbuj ponownie później'])
    });
  };
  return (
    <>
      <Heading>Dodaj aukcję</Heading>
      {errorMessages.length > 0 && <Heading>
        {errorMessages.map(error => <div style={{ color: "red" }}>{error}</div>)}
      </Heading>}
      <form onSubmit={onAdd}>
        <div className="create-auction-page">
          <div className="create-auction-page__image"
               style={imagePreview && { backgroundImage: `url(${imagePreview})` }}>
            <span className="create-auction-page__image-backdrop">
              URL obrazka:&nbsp;
              <input name="image" placeholder="image" type="text" onChange={chanegImagePreview} />
            </span>
          </div>
          <div className="create-auction-page__details create-auction-details">
            <span
              className="create-auction-details__status">koniec aukcji: {endDateToRelative(endDate)}</span>
            <span className="create-auction-details__title">
              <input name="title" placeholder="Tytuł" type="text" minLength="3" maxLength="100" required /></span>
            <span className="create-auction-details__price">
              <input name="price" placeholder="1.00" type="number" min="0.00" max="10000.00" step="1"
              />&nbsp;zł
            </span>
            <span className="create-auction-details__shortdescription">
              <label>Krótki opis</label>
              <textarea name="shortDescription" id="shortDescription" rows="4" minLength="5" maxLength="250"
                        required></textarea>
            </span>
            <span className="create-auction-details__description">
              <label>Opis</label>
              <textarea name="longDescription" id="longDescription" rows="10" minLength="5" maxLength="2500"
                        required></textarea>
            </span>
            <div className="create-auction-details__bidding">
              <button type="submit" className="button">Dodaj ogłoszenie</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateAuction;

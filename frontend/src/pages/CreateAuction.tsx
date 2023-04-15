import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuction } from "../api/auction";

const CreateAuction: FunctionComponent = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();
  const onAdd = (event: SubmitEvent) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    const endDate = new Date(data.get("endDate").toString());
    const image = data.get("image").toString();
    const longDescription = data.get("longDescription").toString();
    const price = parseInt(data.get("price").toString(), 10);
    const shortDescription = data.get("shortDescription").toString();
    const title = data.get("title").toString();

    createAuction({
      endDate,
      image,
      longDescription,
      price,
      shortDescription,
      title
    }).then((response) => {
      navigate(`/auction/${response.data.id}`);
    }).catch((response) => {
      console.log(response);
      if (response.code === 401) {
        // navigate("/");
      }
      if (response.response.data.message) {
        // setErrorMessages(response?.response?.data?.message);
      }
    });
  };
  return (<>
    <h1>Dodaj aukcje</h1>
    {errorMessages.map(error => <div style={{ color: "red" }}>{error}</div>)}
    <form onSubmit={onAdd} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <input name="title" placeholder="title" type="text" />
      <input name="image" placeholder="image" type="text" />
      <input name="shortDescription" placeholder="shortDescription" type="text" />
      <input name="longDescription" placeholder="longDescription" type="text" />
      <input name="endDate" placeholder="endDate" type="date" />
      <input name="price" placeholder="price" type="text" />
      <button type="submit">zrób</button>
    </form>
  </>);
};

export default CreateAuction;

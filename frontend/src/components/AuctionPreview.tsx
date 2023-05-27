import React, { FunctionComponent } from "react";
import { Auction } from "../api/auction";
import "./AuctionPreview.css";
import { Link } from "react-router-dom";

interface Props {
  auction: Auction;
}

const AuctionPreview: FunctionComponent<Props> = ({ auction }) =>
  (
    <Link className="auction-preview" to={`/auction/${auction.id}`}>
      <div className="auction-preview__image preview-image">
        {auction.image.trim() !== ""
          ? <img src={auction.image} alt={auction.title} className="preview-image__image"/>
          : <div className="preview-image__placeholder">{auction.title}</div>
        }
        <span className="preview-image__caption caption">
          <span className="caption__title">{auction.title}</span>
          <span className="caption__price">{auction.price} zł</span>
        </span>
      </div>
      <div className="auction-preview__date">{auction.endDate}</div>
      <div className="auction-preview__excerpt">{auction.shortDescription}</div>
    </Link>
  );

export default AuctionPreview;

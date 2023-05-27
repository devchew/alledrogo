import { Link } from "react-router-dom";

import { getTimeRemaining } from "../../../helpers";
import { Auction } from "../../../api/auction";

import "./AuctionTable.css";

type AuctionTableType = {
  auctions: Auction[]
}
export const AuctionTable = ({ auctions }: AuctionTableType) => {
  const date1 = new Date(auctions[0]?.endDate);

  const element = auctions.map(item => <tr key={item.id}>
    <td className="auction-table-item-image">
      <Link to={`/auction/${item.id}`}>
        <img src={item.image} alt="auction image" />
      </Link></td>
    <td className="auction-table-item-winner">{item.bids[0]?.name ?? "---"}</td>
    <td className="auction-table-item-price">{item.status ? "Zakończona" : getTimeRemaining(item.endDate)}</td>
    <td className="auction-table-item-price">{item.price}</td>
  </tr>);

  return <table className="auction-table">
    <thead>
    <tr>
      <th className="auction-table-logo">Logo</th>
      <th className="auction-table-winner">Wygrywa</th>
      <th className="auction-table-winner">Do końca</th>
      <th className="auction-table-price">Cena</th>
    </tr>
    </thead>
    <tbody>
    {element}
    </tbody>
  </table>;
};

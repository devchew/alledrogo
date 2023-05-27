import "./Sidebar.css";

type SidebarType = {
  onClick: () => void;
}
export const Sidebar = ({ onClick }: SidebarType) => {

  return <div className="sidebar">
    <ul className="sidebar__list">
      <li onClick={() => onClick("profile")}>Dane</li>
      <li onClick={() => onClick("password")}>Zmień hasło</li>
      <ul>Moje aukcje:
        <li onClick={() => onClick("my-win-auctions")}>Wygrane</li>
        <li onClick={() => onClick("my-auctions")}>Sprzedaje</li>
        <li onClick={() => onClick("my-bids")}>Licytuje</li>
      </ul>
    </ul>
  </div>;
};

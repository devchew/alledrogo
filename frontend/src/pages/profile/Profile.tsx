import { useState } from "react";

import { EditProfile } from "../../components/profile/EditProfile";
import { Sidebar } from "../../components/profile/Sidebar";

import { EditPassword } from "../../components/profile/EditPassword";
import { MyAuctions } from "../../components/profile/MyAuctions";
import { BidAuctions } from "../../components/profile/BidAuctions";
import { MyWinAuctions } from "../../components/profile/MyWinAuctions";

import "./Profile.css";

export const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");

  let element;

  switch (activeSection) {
    case "profile":
      element = <EditProfile/>;
      break;
    case "password":
      element = <EditPassword/>;
      break;
    case "my-auctions":
      element = <MyAuctions/>;
      break;
    case "my-win-auctions":
      element = <MyWinAuctions/>;
      break;
    case "my-bids":
      element = <BidAuctions/>;
      break;
    default:
      element = <EditProfile/>;
      break;
  }
  return <div className="profile-page">
    <Sidebar section={activeSection} onClick={setActiveSection}/>
    {element}
  </div>;

};

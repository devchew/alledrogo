import { useState } from "react";

import { EditProfile } from "../../components/profile/EditProfile";
import { Sidebar } from "../../components/profile/Sidebar";

import "./Profile.css";

export const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");

  let element;

  switch (activeSection) {
    case "profile":
      element = <EditProfile/>;
      break;
    case "password":
      element = "Zmień hasło";
      break;
    case "my-auction":
      element = "Sprzedaje";
      break;
    case "my-bids":
      element = "Licytuje";
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

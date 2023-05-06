import React, { FunctionComponent } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

interface Props {
}

const Hero: FunctionComponent<Props> = (props) => {

  return (
    <div className="hero">
      <h2 className="hero__title">Rozpocznij swoją przygodę z aukcjami online</h2>
      <h3 className="hero__subtitle">Zdobądź cenne przedmioty w łatwy sposób dzięki naszej prostych aukcjom
        internetowych.</h3>
      <Link className="hero__action" to="/auction/add">Dodaj ogłoszenie + </Link>
    </div>
  );
};

export default Hero;

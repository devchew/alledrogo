import React, { FunctionComponent } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

interface Props {
}

const Hero: FunctionComponent<Props> = () => {

  const { isAuth } = useAuth();

  return (
    <div className="hero">
      <h2 className="hero__title">Rozpocznij swoją przygodę z aukcjami online</h2>
      <h3 className="hero__subtitle">Zdobądź cenne przedmioty w łatwy sposób dzięki naszej prostych aukcjom
        internetowych.</h3>
      <Link className="hero__action" to={isAuth ? "/auction/add" : "/login"}>Dodaj ogłoszenie + </Link>
    </div>
  );
};

export default Hero;

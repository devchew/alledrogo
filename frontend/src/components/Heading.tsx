import React, { FunctionComponent } from "react";
import "./Heading.css";

interface Props {

}

const Heading: FunctionComponent<Props> = (props) =>
  (
    <h3 className="heading">{props.children}</h3>
  );

export default Heading;

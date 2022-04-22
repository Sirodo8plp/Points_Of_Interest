import React from "react";
const Card = (props) => {
  const width = props.width ? props.width : "20rem";

  let btn;
  if (props.buttonLink && props.buttonText) {
    btn = (
      <a
        href={props.buttonLink}
        className="btn btn-primary mx-auto"
        style={{ width: "max-content", display: "block" }}
      >
        {props.buttonText}
      </a>
    );
  }
  return (
    <div className={"card mb-2 mb-md-0 " + props.classes} style={{ width }}>
      <img
        src={props.imageLink}
        width="150"
        height="150"
        className="card-img-top"
        alt="Main section feature"
      />
      <div className="card-body">
        <h5 className="card-title text-center mt-2">{props.heading}</h5>
        <p className="card-text text-center mt-4">{props.description}</p>
        {btn}
      </div>
    </div>
  );
};

export default Card;

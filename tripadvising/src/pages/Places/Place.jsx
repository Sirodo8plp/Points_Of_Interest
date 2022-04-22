import React from "react";
import { Link } from "react-router-dom";
const Place = ({ place }) => {
  return (
    <div className="col-sm">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{place.title}</h5>
          <p className="card-text">{place.summary.substring(0, 75)}...</p>
        </div>
        <div className="card-body">
          <Link
            className="btn btn-primary mx-md-3"
            to={`/POI/${place.lat}&${place.lng}&${place.title}`}
          >
            Businesses
          </Link>
          <a
            href={`https://${place.wikipediaUrl}`}
            className="btn btn-secondary"
          >
            Wikipedia
          </a>
        </div>
      </div>
    </div>
  );
};

export default Place;

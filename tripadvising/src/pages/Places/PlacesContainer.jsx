import React from "react";
import Place from "./Place";
import useGetFetch from "../../components/hooks/useGetFetch";

const PlacesContainer = ({ place }) => {
  const { error, isPending, data } = useGetFetch(
    `http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=${place}&maxRows=12&username=sirodo8&style=full`
  );

  let numberOfRows = [];
  if (data && data.geonames && data.geonames.length % 3 === 0) {
    for (let i = 0; i < 4; i++) {
      numberOfRows.push(i + 1);
    }
  }
  if (data && data.geonames && data.geonames.length % 3 !== 0) {
    for (let i = 0; i < Math.floor(data.geonames.length / 3) + 1; i++) {
      numberOfRows.push(i + 1);
    }
  }

  let placesToShow;
  if (data && data.geonames && data.geonames.length > 0) {
    placesToShow = numberOfRows.map((value, index) => (
      <div className="row mb-3" key={index}>
        {data.geonames.slice(3 * value - 3, 3 * value).map((place, index) => (
          <Place place={place} key={index} />
        ))}
      </div>
    ));
  }

  return (
    <React.Fragment>
      {isPending && (
        <h2 className="text-center my-5">Loading Results for {place}</h2>
      )}
      {error && (
        <div
          className="alert alert-danger mx-auto my-5"
          style={{ maxWidth: "max-content" }}
        >
          {error}
        </div>
      )}
      {placesToShow && placesToShow}
    </React.Fragment>
  );
};

export default PlacesContainer;

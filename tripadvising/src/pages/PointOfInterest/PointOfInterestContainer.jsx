import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import POI from "./POI";
import Pagination from "./Pagination";
import useFetch from "../../components/hooks/useGetFetch";
import GetNumberOfRows from "../../GetNumberOfRows";
import API_KEY from "../../constants";

const PointOfInterestContainer = () => {
  const [isPending, setIsPending] = useState(null);
  const [offset, setOffset] = useState(0);
  const { coordinates } = useParams();
  const lat = coordinates.split("&")[0];
  const lng = coordinates.split("&")[1];
  const place = coordinates.split("&")[2];
  const [POIs, setPOIs] = useState([]);
  const { data } =
    useFetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=1000&limit=12&lon=${lng}
  &lat=${lat}&rate=2&format=count&kinds=shops,foods&apikey=${API_KEY}`);

  useEffect(() => {
    setIsPending(true);
    axios
      .get("https://api.opentripmap.com/0.1/en/places/radius", {
        params: {
          radius: 1000,
          limit: 12,
          lon: lng,
          lat: lat,
          rate: 2,
          format: "json",
          apikey: API_KEY,
          kinds: "shops,foods",
          offset: offset,
        },
      })
      .then((data) => {
        setIsPending(false);
        setPOIs(data.data);
      })
      .catch((err) => setIsPending(false));
  }, [offset]);

  let numberOfRows;
  if (POIs) numberOfRows = GetNumberOfRows(POIs, 3);
  let POIsToShow;

  if (POIs && POIs.length > 0) {
    POIsToShow = numberOfRows.map((value, index) => (
      <div className="row mb-3" key={index}>
        {POIs.slice(3 * value - 3, 3 * value).map((poi, index) => (
          <POI poi={poi} key={index} />
        ))}
      </div>
    ));
  }

  return (
    <React.Fragment>
      <h1 className="text-center my-3">Shops near {place}</h1>
      {isPending === true && (
        <h2 className="my-4 text-center">
          Loading local shops near {place}...
        </h2>
      )}
      {data && data.count && (
        <Pagination count={data.count} setOffset={setOffset}>
          {POIsToShow && <div className="container">{POIsToShow}</div>}
        </Pagination>
      )}
    </React.Fragment>
  );
};

export default PointOfInterestContainer;

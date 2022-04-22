import axios from "axios";
import React, { useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import "../../../public/POI.css";
import Review from "./Review";
import API_KEY from "../../constants";
const POI = ({ poi }) => {
  const [imageClassname, setImageClassname] = useState("");
  const [imageLink, setImageLink] = useState(null);

  const loadImageHandler = async () => {
    setImageClassname((prev) => {
      if (prev === "") return "pointImageContainer--extended";
      return "";
    });
    if (!imageLink) {
      const data = await axios.get(
        `https://api.opentripmap.com/0.1/en/places/xid/${poi.xid}`,
        {
          params: {
            apikey: API_KEY,
          },
        }
      );
      setImageLink(data.data.preview.source);
      setImageClassname("pointImageContainer--extended");
    }
  };
  return (
    <div className="col-sm">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{poi.name}</h5>
        </div>
        <div className="card-body text-center">
          <Review placeInformation={poi} />
        </div>
        <div
          className={`pointImageContainer ${
            imageClassname !== "" ? imageClassname : ""
          }`}
        >
          {imageLink && <img src={imageLink} alt="Wikipedia Link" />}
        </div>
        {poi.xid && (
          <BsChevronDoubleDown
            className="dropdownSVG"
            onClick={loadImageHandler}
          />
        )}
      </div>
    </div>
  );
};

export default POI;

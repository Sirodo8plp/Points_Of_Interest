import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import ReviewButton from "./ReviewButton";
import axios from "axios";

const Review = ({ placeInformation }) => {
  const [data, setData] = useState(null);
  const SaveReviewHandler = async (reviewData) => {
    const config = {
      url: "http://localhost:4000/review",
      method: "post",
      headers: {
        auth: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        comment: reviewData.comment,
        rating: reviewData.rating,
        title: reviewData.title,
        placeName: placeInformation.name,
      }),
      timeout: 1000,
    };
    try {
      const data = await axios(config);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <React.Fragment>
      <ReviewButton onSaveReview={SaveReviewHandler} place={placeInformation} />
      {data &&
        data.status === 201 &&
        ReactDOM.createPortal(
          <div className="alert alert-success alert-dismissible fade show">
            <strong>Success!</strong> Your review was created.
            <button
              type="button"
              className="btn-close"
              onClick={() => setData(null)}
              aria-label="Close"
            ></button>
          </div>,
          document.getElementById("notificationsContainer")
        )}
      {data &&
        data.status === 500 &&
        ReactDOM.createPortal(
          <div className="alert alert-success alert-dismissible fade show">
            <strong>Oh no!</strong> Something went wrong. Please, try again
            later.
            <button
              type="button"
              className="btn-close"
              onClick={() => setData(null)}
              aria-label="Close"
            ></button>
          </div>,
          document.getElementById("notificationsContainer")
        )}
    </React.Fragment>
  );
};

export default Review;

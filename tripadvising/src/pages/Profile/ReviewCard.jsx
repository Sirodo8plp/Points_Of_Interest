import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="col-sm">
      <div className="card bg-dark text-white">
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-center">
            <strong>Business Name:</strong>
          </li>
          <li className="list-group-item text-center">
            {review.Business.name}
          </li>
          <li className="list-group-item text-center">
            <strong>Review Title:</strong>
          </li>
          <li className="list-group-item text-center">{review.title}</li>
          <li className="list-group-item text-center">
            <strong>Review Comment:</strong>
          </li>
          <li className="list-group-item text-center">{review.text}</li>
          <li className="list-group-item text-center">
            <strong>Review Rating: </strong>
            {review.rating}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReviewCard;

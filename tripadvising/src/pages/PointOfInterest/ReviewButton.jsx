import React, { useRef, useState } from "react";
import Modal from "./Modal";

const ReviewButton = ({ place, onSaveReview }) => {
  const comment = useRef(null);
  const rating = useRef(null);
  const title = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const onSaveHandler = (e) => {
    e.preventDefault();
    onSaveReview({
      comment: comment.current.value,
      rating: rating.current.value,
      title: title.current.value,
    });
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Review
      </button>
      <Modal
        onClose={() => {
          setIsOpen(false);
        }}
        show={isOpen}
        placeName={place.name}
      >
        <form onSubmit={onSaveHandler}>
          <div className="form-group">
            <label htmlFor="reviewTitle" className="my-2">
              Review Title
            </label>
            <input
              type="text"
              required={true}
              ref={title}
              className="form-control"
              id="reviewTitle"
            />
          </div>
          <div className="form-group">
            <label htmlFor="shopComment" className="my-2">
              Comment
            </label>
            <textarea
              required={true}
              ref={comment}
              className="form-control"
              id="shopComment"
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="ratingNumber" className="my-2">
              Rating
            </label>
            <input
              required={true}
              ref={rating}
              className="form-control"
              type="number"
              name="ratingNumber"
              id="ratingNumber"
              min={0}
              max={10}
              step={1}
            />
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-evenly">
            <button type="submit" className="btn btn-success my-2">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-dark my-2"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default ReviewButton;

import React, { useState, useEffect } from "react";
import GetNumberOfRows from "../../GetNumberOfRows";
import ReviewCard from "./ReviewCard";
import Pagination from "../PointOfInterest/Pagination";

const Profile = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const abortCont = new window.AbortController();

    setTimeout(() => {
      fetch("http://localhost:4000/review", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, []);

  useEffect(() => {
    const abortCont = new window.AbortController();

    setTimeout(() => {
      fetch(`http://localhost:4000/review/paginated/${offset}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
          }
        });
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, [offset]);
  let numberOfRows;
  if (data) numberOfRows = GetNumberOfRows(data.reviews, 4);
  let dataToShow;
  if (data && data.reviews && data.reviews.length > 0) {
    dataToShow = numberOfRows.map((value, index) => (
      <div className="row mb-3" key={index}>
        {data.reviews.slice(4 * value - 4, 4 * value).map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    ));
  }

  return (
    <React.Fragment>
      {isPending && (
        <h2 className="my-3 text-center">Loading your reviews...</h2>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
      {data && <h2 className="text-left my-3">Hello ${data.username}</h2>}
      {data && (
        <h5 className="text-left my-2">
          You have created {data._count.reviews} reviews.
        </h5>
      )}
      {data && data._count.reviews && (
        <Pagination count={data._count.reviews} setOffset={setOffset}>
          {dataToShow && <div className="container my-3">{dataToShow}</div>}
        </Pagination>
      )}
      {data && data.reviews.length === 0 && (
        <h2 className="text-center"> You have not created any reviews yet.</h2>
      )}
    </React.Fragment>
  );
};

export default Profile;

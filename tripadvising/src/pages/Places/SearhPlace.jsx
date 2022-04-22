import React, { useMemo, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import PlacesContainer from "./PlacesContainer";

const SearchPlace = () => {
  const [placeToSearch, setPlaceToSearch] = useState();

  const searchHandler = async (e) => {
    setPlaceToSearch(e.target.value);
  };

  const debouncedSearchHandler = useMemo(() => {
    return debounce(searchHandler, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearchHandler.cancel();
    };
  }, []);

  if (!window.localStorage.getItem("token")) {
    return (
      <div className="alert alert-warning w-50 mx-auto text-center my-5">
        You need to sign in in order to search places.
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="w-50 mx-auto my-3">
        <input
          type="search"
          className="form-control"
          placeholder="Search..."
          onChange={debouncedSearchHandler}
        />
      </div>
      {placeToSearch && <PlacesContainer place={placeToSearch} />}
    </React.Fragment>
  );
};

export default SearchPlace;

import React, { useState } from "react";

const SearchBar = (props) => {
  const [search, setSearch] = useState(props.search);

  const updateSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    props.onTermChange(search);
    props.onTermSubmit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onTermSubmit();
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

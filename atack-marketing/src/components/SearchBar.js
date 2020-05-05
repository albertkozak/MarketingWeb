import React, { useState } from "react";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="search-container">
      <form onSubmit={getSearch} className="search-form">
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

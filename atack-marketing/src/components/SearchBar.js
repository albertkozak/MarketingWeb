import React from "react";

const SearchBar = (props) => {
  return (
    <div className="search-container">
      <form className="search-form">
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={props.search}
          onChange={props.handleSearchTerm}
        />
      </form>
    </div>
  );
};

export default SearchBar;

import React from "react";

const SearchBar = (props) => {
  // const [search, setSearch] = useState(props.search);

  // const updateSearch = (e) => {
  //   //e.preventDefault();
  //   if (e.target.value !== null) {
  //     setSearch(e.target.value);
  //     props.onTermChange(search);
  //     props.onTermSubmit();
  //   } else {
  //     setSearch("");
  //     props.onTermChange(search);
  //     props.onTermSubmit();
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   props.onTermSubmit();
  // };

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
        {/* <button className="search-button" type="submit">
          SEARCH
        </button> */}
      </form>
    </div>
  );
};

export default SearchBar;

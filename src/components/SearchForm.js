import React, {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import SearchIcon from './SearchIcon';

const SearchForm = (props) => {
  const history = useHistory();
  const {execSearch} = props;
  let searchInput = useRef(null);

  const onSearchChange = (e) => {
    searchInput = e.target.value;
  }

  const handleSubmit = ((e) => {
    e.preventDefault();
    execSearch(searchInput);
    const path = `/Search/${searchInput}`;
    history.push(path);
    e.currentTarget.reset();
  });

    return(
      <form className="search-form" onSubmit={handleSubmit}>
        <input type="search"
          name="search"
          ref={searchInput}
          onChange={onSearchChange}
          placeholder="Search Tags"
          autoComplete="off"
          required="required"
          />
        <button className="search-button" type="submit" >
          <SearchIcon />
        </button>
      </form>
    );

}

export default SearchForm;
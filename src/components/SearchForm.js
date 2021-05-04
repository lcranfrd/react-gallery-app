import React, {Component} from 'react';
import SearchIcon from './SearchIcon';

export default class SearchForm extends Component {

  state = {
    searchText: ''
  }

  onSearchChange = ((e) => {
    this.setState({searchText: e.target.value});
  });

  handleSubmit = ((e) => {
    e.preventDefault();
    this.props.execSearch(this.query.value);
    e.currentTarget.reset();
  });

  render() {
    return(
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input type="search"
          name="search"
          ref={(input) => this.query = input}
          placeholder="Search"
          required="required"
          onChange={this.onSearchChange} />
        <button className="search-button" type="submit">
          <SearchIcon />
        </button>
      </form>
    );
  }
}
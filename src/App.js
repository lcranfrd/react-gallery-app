import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import Config from './config';
import './App.css';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav'
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound'

export default class App extends Component {
  
  state = {
    data: [],
    loading: true
  };


  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = Config.text) => {
    Config.text = query;
    axios.get('https://www.flickr.com/services/rest/', {params:{...Config}})     
    .then((response) => {
      this.setState({
        data: response.data.photos.photo,
        loading: false
      })
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error)
    })
  }

  render() { 
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm execSearch={this.performSearch}/>
          <Nav />
          <Switch>
            <Route path='/' render={() => <PhotoContainer data={this.state.data} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

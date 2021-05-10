import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import Config from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav'
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';

export default class App extends Component {
  constructor() {
    super();
    this.config = {
      method: "flickr.photos.search",
      api_key: Config.api_key,//"d540df949792eeb7b780eb56090c2564",
      tags: "astronomy",
      sort: "relevance",
      per_page: "16",
      format: "json",
      nojsoncallback: "1"
    };
  }
  
  state = {
    data1: [],
    data2: [],
    data3: [],
    data4: [],
    data5: [],
    query: '',
    loading: true
  };


  
  componentDidMount() {
    this.fetchData('astronomy')
    this.fetchData('boats', 'data2')
    this.fetchData('Experimental Planes', 'data3')
    this.fetchData('mountains', 'data4')
  }
    
    fetchData = (query = this.config.tags, dataPage = 'data1') => {
      console.log(this.config)
      this.config.tags = query;
      dataPage === 'data5' && this.setState({loading: true})
      axios.get('https://www.flickr.com/services/rest/', {params:{...this.config}})
        .then((res) => {
          this.setState({
            [dataPage]: res.data.photos.photo,
            loading: false,
            query
          })
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error)
      })
    }
    
    performSearch = (topic) => {
      console.log(topic)
      this.fetchData(topic, 'data5');
    }
    
    render() { 
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm execSearch={this.performSearch} />
          <Nav />
             { (this.state.loading)
                ? <h1>Loading!</h1>
                : <Switch>
                  <Route exact path='/' render={() =>
                    <PhotoContainer
                      data={this.state.data1}
                      title='Astronomy'
                    />} />
                  <Route path='/Astronomy' render={() => <Redirect to='/' />} />
                  <Route path='/Boats' render={() =>
                    <PhotoContainer
                      data={this.state.data2}
                      title='Boats'
                    />}
                  />
                  <Route path='/Experimental Planes' render={() =>
                    <PhotoContainer
                      data={this.state.data3}
                      title='Experimental Planes'
                    />}
                  />
                  <Route path='/Mountains' render={() =>
                    <PhotoContainer
                      data={this.state.data4}
                      title='Mountains'
                    />}
                  />
                  <Route path='/Search/:topic' render={(props) =>
                    <PhotoContainer
                      data={this.state.data5}
                      title={this.state.query}
                      {...props}
                    />}
                  />
                  <Route component={NotFound} />
                </Switch>
             }
        </div>
      </BrowserRouter>
    );
  }
}

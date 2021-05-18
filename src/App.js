import React, {Component} from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import Config from './config';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav'
import PhotoContainer from './components/PhotoContainer';
import NotFound from './components/NotFound';

export default class App extends Component {
  constructor () {
    super();
    this.fetchOptions = {
      method: "flickr.photos.search",
      api_key: Config.api_key,
      tags: "astronomy",
      sort: "relevance",
      per_page: "16",
      format: "json",
      nojsoncallback: "1"
    }
    this.state = {
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      topic: '',
      loading: true
    };
}
  
  componentDidMount() {
    this.fetchData('Astronomy')
    this.fetchData('Boats', 'data2')
    this.fetchData('Experimental Planes', 'data3')
    this.fetchData('Oort Cloud', 'data4')
  }
    
    fetchData = (topic = this.fetchOptions.tags, dataPage = 'data1') => {
      this.fetchOptions.tags = topic;
      dataPage === 'data5' && this.setState({loading: true})
      axios.get('https://www.flickr.com/services/rest/', {params:{...this.fetchOptions}})
        .then((res) => {
          this.setState({
            [dataPage]: res.data.photos.photo,
            loading: false,
            topic
          })
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error)
      })
    }
    
    performSearch = (topic) => {
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
                  <Route path='/Oort Cloud' render={() =>
                    <PhotoContainer
                      data={this.state.data4}
                      title='Oort Cloud'
                    />}
                  />
                  <Route path='/Search/:topic' render={(props) =>
                    <PhotoContainer
                      execSearch={this.performSearch}
                      data={this.state.data5}
                      title={this.state.topic}
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

/**=================================================================================================
 * ?                                                     ABOUT
 * @author         :  L. Bennett Crantford
 * @email          :  lcranfrd@comcast.net
 * @repo           :  
 * @createdOn      :  5/22/2021
 * @description    :  React App Exercise to Display images from Flickr API
 *===============================================================================================**/
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
import LargePicModal from './components/LargePicModal';

/**========================================================================
 *                           APP
 * Constructor method:
 * 'this.state'
 *  data points for jason data storage and variables for rendering and props.
 * 'this.fetchOpions'
 *  object listing paramenters used for axios.get. Created for easy editing.
 * 'this.titles'
 *  object for titles associated with data points. These are used as values
 *  for the tag parameter in the fetchOptions as well as NavLink rendering.
 *  
 *========================================================================**/
class App extends Component {
  constructor () {
    super();
    this.state = {
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      topic: '',
      loading: true,
      isModalOn: false,
      modalUrl: "",
      largePicName: ""
    };
    this.fetchOptions = {
      method: "flickr.photos.search",
      api_key: Config.api_key,
      tags: "",
      sort: "relevance",
      per_page: "24",
      content_type: 1,
      format: "json",
      nojsoncallback: "1",
    }
    this.titles = {
      title1: 'Hubble',
      title2: 'Monuments',
      title3: 'NTSB',
      title4: 'Surveilence'
    }
  }
  
/**========================================================================
 **                           componentDidMount
 *?  React method for post mount rendering. All preset data objects are
 *?  loaded with flickr json data. Those data points are aligned with
 *?  Navlinks in 'Nav.js' and jason data passed to 'PhotoContainer.js' for
 *?  image processing when activated via NavLink.
 *@return null
 *========================================================================**/
  componentDidMount() {
    this.fetchData(this.titles.title1)
    this.fetchData(this.titles.title2, 'data2')
    this.fetchData(this.titles.title3, 'data3')
    this.fetchData(this.titles.title4, 'data4')
  }

/**========================================================================
 **                           fetchData
 *?  Function to load one of the data objects with json data from axios.get
 *?  call. 'dataPage' contains the string identifying the corresponding
 *?  data object. 'topic is the string value to set the tags parameter for
 *?  'fetchOptions' fed to axios.get.
 *@param topic string  
 *@param dataPage string  
 *@return null
 *========================================================================**/
    fetchData = (topic = this.titles.title1, dataPage = 'data1') => {
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
    
/**========================================================================
 **                           performSearch
 *?  Callback invoking fetchData() with user input search string for
 *?  axios.get setting the datapoint object which will be passed to the
 *?  'search/:topic' route.
 *@param topic string  
 *@return null
 *========================================================================**/
    performSearch = (topic) => {
      this.fetchData(topic, 'data5');
    }

/**========================================================================
 **                           modalOn
 *?  Callback invoking 'this.setState()' react method activated by the user
 *?  clicking on an image. This will cause a render showing the larger version
 *?  of the image clicked with the route 'LargePic/:name'.
 *@param largeUrl type  
 *@param title type  
 *@return null
 *========================================================================**/
    modalOn = (largeUrl, title = 'Title Not Recorded') => {
      this.setState({
        isModalOn: true,
        modalUrl: largeUrl,
        largePicName: title
      })
    }

    render() { 
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm execSearch={this.performSearch} />
          <Nav titles={this.titles}/>
             { (this.state.loading)
                ? <h1>Loading!</h1>
                : <Switch>
                  <Route exact path='/' render={() =>
                    <PhotoContainer
                      data={this.state.data1}
                      title={this.titles.title1}
                      modalOn={this.modalOn}
                    />} />
                  <Route path={`/${this.titles.title1}`} render={() => <Redirect to='/' />} />
                  <Route path={`/${this.titles.title2}`} render={() =>
                    <PhotoContainer
                      data={this.state.data2}
                      title={this.titles.title2}
                      modalOn={this.modalOn}
                    />}
                  />
                  <Route path={`/${this.titles.title3}`} render={() =>
                    <PhotoContainer
                      data={this.state.data3}
                      title={this.titles.title3}
                      modalOn={this.modalOn}
                    />}
                  />
                  <Route path={`/${this.titles.title4}`} render={() =>
                    <PhotoContainer
                      data={this.state.data4}
                      title={this.titles.title4}
                      modalOn={this.modalOn}
                    />}
                  />
                  <Route path='/Search/:topic' render={(props) =>
                    <PhotoContainer
                      execSearch={this.performSearch}
                      data={this.state.data5}
                      title={this.state.topic}
                      modalOn={this.modalOn}
                      {...props}
                    />}
                  />
                  <Route path='/LargePic/:name' render={() =>
                    <LargePicModal
                      img={this.state.modalUrl}
                      title={this.state.largePicName}
                      isModalOn={true}
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

export default App
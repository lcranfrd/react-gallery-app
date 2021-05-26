/**------------------------------------------------------------------------
 * *                         PhotoContainer.js
 *
 * Class Component using componentDidUpdate() to test path for
 * '/Search/:topic' value. Will cause a new fetch with the 'topic' value.
 * This keeps the continuity for the browser's back/forward history with
 * the search pages.
 *------------------------------------------------------------------------**/
import React, {Component} from 'react';
import PhotoBuild from './PhotoBuild';

class PhotoContainer extends Component  {

  componentDidUpdate() {
    const path = this.props.match?.path;
    const topic = this.props?.match?.params?.topic;
    (path === '/Search/:topic' && this.props.title !== topic)
     && this.props.execSearch(topic);
  }

  render() {
    const {data, modalOn, title} = this.props;
    return(
      <div className="photo-container animate__animated animate__slideInDown">
        <h2>{title}</h2>
        {data.length === 0
          ? <h3>Your Search Did Not Return Any Results</h3>
          : <><h4>Click Picture for Larger View</h4>
          <ul>
              {
                [...data].map((v) => 
                  <PhotoBuild 
                    serverId={v.server}
                    id={v.id}
                    secret={v.secret}
                    title={v.title? v.title: 'Title Not Recorded'}
                    modalOn={modalOn}
                    key={v.id}
                  />
                )
              }
          </ul>
          </>
        }
      </div>
    );
  }
}

export default PhotoContainer;

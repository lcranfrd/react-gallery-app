/**------------------------------------------------------------------------
 * *                                PhotoContainer.js
 *
 * Functional Component which first tests the '/Search/:topic' route with
 * the most recent search topic and forces an axios.get if they are not the
 * same. This provides continuity in the browser's back/forward buttons
 * with the rendered data being in sync with the route being called via
 * the browser's history. If the new search is not necessary, the
 * 'PhotoBuild.js' component is rendered.
 *------------------------------------------------------------------------**/
import React from 'react';
import {withRouter} from 'react-router-dom';
import PhotoBuild from './PhotoBuild';

const PhotoContainer = ((props) => {
  const {data, execSearch, title, modalOn, match: {params: {topic}, path}} = props;
  (path === '/Search/:topic' && title !== topic) && execSearch(topic);

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
})

export default withRouter(PhotoContainer);

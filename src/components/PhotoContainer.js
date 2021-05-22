
import React from 'react';
import {withRouter} from 'react-router-dom';
import PhotoBuild from './PhotoBuild';

const PhotoContainer = ((props) => {
  const {data, execSearch, title, modalOn, match: {params: {topic}, path}} = props;

  (path === '/Search/:topic' && title !== topic) && execSearch(topic);

  return(
    <div className="photo-container">
      <h2>{title}</h2>
      {data.length === 0
        ? <h3>Your Search Did Not Return Any Results</h3>
        :<ul>
        {
          [...data].map((v) => 
            <PhotoBuild 
              serverId={v.server}
              id={v.id}
              secret={v.secret}
              title={v.title}
              modalOn={modalOn}
              key={v.id}
            />
          )
        }
        </ul>
      }
    </div>
  );
})

export default withRouter(PhotoContainer);

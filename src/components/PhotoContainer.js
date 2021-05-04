import React from 'react';
import PhotoBuild from './PhotoBuild';

const PhotoContainer = ((props) => {
  return(
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
      {
        [...props.data].map((v) => 
          <PhotoBuild 
            serverId={v.server}
            id={v.id}
            secret={v.secret}
            title={v.title}
            key={v.id}
          />
        )
      }
      </ul>
    </div>
  );
})

export default PhotoContainer;

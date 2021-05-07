import React from 'react';
import PhotoBuild from './PhotoBuild';

const PhotoContainer = ((props) => {
  const {data, title} = props;
  return(
    <div className="photo-container">
      <h2>{title}</h2>
      <ul>
      {
        [...data].map((v) => 
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

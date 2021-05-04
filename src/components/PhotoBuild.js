import React from 'react';

const PhotoBuild = (props) => {
  const imgSrc = `https://live.staticflickr.com/${props.serverId}/${props.id}_${props.secret}.jpg`;

  return (
    <li>
      <img src={imgSrc} alt={props.title} />
    </li>
  );
};

export default PhotoBuild;
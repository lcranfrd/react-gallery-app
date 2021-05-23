import React from 'react';
import { withRouter } from 'react-router';

const PhotoBuild = (props) => {
  const {serverId, id, secret, title, modalOn} = props;
  const imgSrc = `https://live.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
  const lrgImgSrc = `https://live.staticflickr.com/${serverId}/${id}_${secret}_b.jpg`;


  const turnOnModal = () => {
    modalOn(lrgImgSrc, title);
    const path = `/LargePic/${title}`;
    props.history.push(path);
  }

  return (
    <li>
      <img src={imgSrc} onClick={turnOnModal} alt={props.title} />
    </li>
  );
};

export default withRouter(PhotoBuild);
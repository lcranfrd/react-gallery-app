/**------------------------------------------------------------------------
 * *                                PhotoBuild.js
 * 
 * Functional component to render photo gallery. Each photo is loaded with
 * an onClick which will render the LargePicModal.js. 'LargePic/:title'
 * is pushed into the history in order for the route proper route to be
 * called.
 *------------------------------------------------------------------------**/
import React from 'react';
import {useHistory} from 'react-router';

const PhotoBuild = (props) => {
  const location = useHistory();
  const {serverId, id, secret, title, modalOn} = props;
  const imgSrc = `https://live.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
  const lrgImgSrc = `https://live.staticflickr.com/${serverId}/${id}_${secret}_b.jpg`;


  const turnOnModal = () => {
    modalOn(lrgImgSrc, title);
    const path = `/LargePic/${title}`;
    location.push(path);
  }

  return (
    <li>
      <img src={imgSrc} onClick={turnOnModal} alt={props.title} />
    </li>
  );
};

export default PhotoBuild;
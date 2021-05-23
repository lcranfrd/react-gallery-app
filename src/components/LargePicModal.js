/**------------------------------------------------------------------------
 * *                          LargePicModal.js
 * 
 * React functional component which displays the large version of the image
 * selected by the user from the gallery page. Close button is provided
 * which removes the image page through history.goBack(). A setTimout()
 * function calls the goBack() method allowing time for the classlist to
 * be renamed invoking a slideOutUp animations. Calling setModalOnState
 * causes a render which accomplishes the page close.
 *------------------------------------------------------------------------**/
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const LargePicModal = (props) => {
  let history = useHistory();
  const {img, title, isModalOn} = props;
  const [modalOnState, setModalOnState] = useState(isModalOn);
  const classIdToggle = () => (
    modalOnState
    ? 'modal-container display-block animate__animated animate__slideInUp'
    : 'modal-container display-none animate__animated animate__slideOutUp');
  
  const turnModal = () => {
    setModalOnState(false);
    classIdToggle();
    setTimeout(() => history.goBack(),750);
  }

  return (
    <div className={classIdToggle()}>
      <div className="modal">
        <div className="modal-info-container">
          <h1 className="large-pic-title">{title}</h1>
          <img src={img} alt={title} />
        </div>
        <div className="modal-btn-container">
          <button className="modal-close-btn" onClick={turnModal}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default LargePicModal;
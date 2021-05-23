import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const LargePicModal = (props) => {
  const {img, title, isModalOn} = props;
  const [modalOnState, setModalOnState] = useState(isModalOn);
  let history = useHistory();
  const classIdToggle = () => (
    modalOnState
    ? 'modal-container display-block animate__animated animate__slideInUp'
    : 'modal-container display-none animate__animated animate__slideOutUp');
  
  const turnModal = () => {
    setModalOnState(false);
    classIdToggle();
    setTimeout(() => history.goBack(),1000);
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
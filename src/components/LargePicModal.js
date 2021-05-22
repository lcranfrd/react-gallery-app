import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';


const LargePicModal = (props) => {
  const {img, title, isModalOn} = props;
  const [modalOnState, setModalOnState] = useState(isModalOn);
  let history = useHistory();
  const classIdToggle = modalOnState? 'modal display-block': 'modal display-none';
  
  const turnModal = () => {
    setModalOnState(false);
    history.goBack();
  }

  return (
    <div className={classIdToggle}>
      <section className="modal-main">
        <img src={img} alt={title} />
        <button onClick={turnModal}>Close</button>
      </section>
    </div>
  )
}

export default LargePicModal;
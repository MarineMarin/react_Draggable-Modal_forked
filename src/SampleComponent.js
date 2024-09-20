import { useState } from "react";
import Modal from "./Modal";
import { CSSTransition } from "react-transition-group";

const SampleComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const onCloseHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1>Modal with Backdrop sample</h1>
      <button className="button" onClick={() => setShowModal(true)}>
        Show Modal
      </button>

      <Modal onClose={onCloseHandler} showModal={showModal}>
        <h2>This is modal</h2>
        <button className="button" onClick={onCloseClicked}>
          Close Modal
        </button>
      </Modal>
    </div>
  );
};

export default SampleComponent;

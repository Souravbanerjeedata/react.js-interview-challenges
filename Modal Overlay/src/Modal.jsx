const Modal = ({ hideModal, offerAcceptHandler }) => {
  function handleOutsideClick(e) {
    if (e.target.className !== "modal-content") {
      hideModal();
    }
  }
  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <button onClick={hideModal}>X</button>
        <p>Click the button below to accept our amazing offer!</p>
        <button onClick={offerAcceptHandler}>Accept offer</button>
      </div>
    </div>
  );
};

export default Modal;

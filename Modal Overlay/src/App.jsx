import { useState } from "react";
import Modal from "./Modal";

const App = () => {
  const [modal, setModal] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  function showModal() {
    setModal(true);
  }
  function hideModal() {
    setModal(false);
  }
  function offerAcceptHandler() {
    setOfferAccepted(true);
    setModal(false);
  }
  return (
    <div>
      <div>
        {!offerAccepted ? (
          <button onClick={showModal}>Show offer</button>
        ) : (
          <div>
            <p>Offer accepted</p>
          </div>
        )}
      </div>
      {modal && (
        <Modal hideModal={hideModal} offerAcceptHandler={offerAcceptHandler} />
      )}
    </div>
  );
};

export default App;

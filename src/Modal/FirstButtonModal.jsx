import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ShowContactsModal from './ShowContactsModal';

const FirstButtonModal = ({ show, handleClose,whichModal }) => {
  const [headingTitle, setHeadingTitle] = useState("");
  const [contacts, setContacts] = useState([]);
  

  // state and function for Inner or Contacts modal 
  const [innerModal, setInnerModal] = useState(false);
  const handleCloseInner = () => setInnerModal(false);
  const handleShowInner = (titleText) => {

    //load ALl contact data
    if (titleText == "All Conatcts") {
      fetch('https://contact.mediusware.com/api/contacts/')
        .then(res => res.json())
        .then(data => {
          setHeadingTitle(titleText)
          setContacts(data.results)
          setInnerModal(true)
        });
        return;
    }

    // load only US Data 
    fetch('https://contact.mediusware.com/api/country-contacts/United%20States/?page=1')
        .then(res => res.json())
        .then(data => {
          setHeadingTitle(titleText)
          setContacts(data.results)
          setInnerModal(true)
        });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{whichModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Button style={{ backgroundColor: "#46139f" }} className="me-2"
              onClick={() => handleShowInner("All Conatcts")}>
              All Contacts
            </Button>
            <Button style={{ backgroundColor: "#ff7f50" }} className="me-2"
              onClick={() => handleShowInner("US Conatcts")}>
              US Contacts
            </Button>

            <Button style={{ backgroundColor: "white", borderColor: "#46139f", color: "black" }} onClick={handleClose}>
              Close
            </Button>
          </div>

          {/* Inner Modal conmponent */}
          {
            <ShowContactsModal
              innerModal={innerModal}
              handleCloseInner={handleCloseInner}
              handleShowInner={handleShowInner}
              contacts={contacts}
              headingTitle={headingTitle}
              setContacts={setContacts}
            />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FirstButtonModal;
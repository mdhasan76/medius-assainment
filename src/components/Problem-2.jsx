import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FirstButtonModal from '../Modal/FirstButtonModal';

const Problem2 = () => {
    const [whichModal, setWhichModal] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (text) => {
        setShow(true)
        if(text == "All-Contact"){
            setWhichModal("Modal A")
            return;
        }
        setWhichModal("Modal B")
    };

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button onClick={() => handleShow("All-Contact")} className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                    <button onClick={() => handleShow("US-Contact")} className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                </div>
                {
                    <FirstButtonModal show={show} handleClose={handleClose} 
                    whichModal={whichModal} />
                }
            </div>
        </div>
    );
};

export default Problem2;
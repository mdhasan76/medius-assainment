import React, { useEffect, useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ShowContactsModal = ({ innerModal, handleCloseInner, contacts, headingTitle,setContacts }) => {
    const [params, setParams] = useState("")

    //Handle Seach data load
    useEffect( () =>{
        fetch(`https://contact.mediusware.com/api/contacts/?search=${params}`)
        .then(res => res.json())
        .then(data => {
            setContacts(data.results)
        });
    } ,[params])

    // console.log(contacts)
    const handleSeachBar = (e) => {
        // e.targe.preventDefault();
        setParams(e.target.value)
    }

    //Filter only even id data
    const [even, setEven] = useState(false);
    const evenContacts = contacts.filter(data => (parseInt(data.id) % 2) == 0);

    return (
        <>
            <Modal show={innerModal} onHide={handleCloseInner}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            even == true ? <p>{"even ID Contact of  " + headingTitle}</p> :
                                headingTitle
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* Search Bar icon */}
                    {
                        headingTitle == "All Conatcts" &&
                        <InputGroup size="lg" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm" >Search Contact</InputGroup.Text>
                            <input
                                type="text"
                                value={params}
                                onChange={handleSeachBar}
                            />
                        </InputGroup>
                    }
                    {
                        even === false ? contacts.map(data => <p key={data.id} >{data.phone}</p>) :
                            evenContacts.map(data => <p key={data.id} >{data.phone}</p>)

                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className='text-start'>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check onChange={() => setEven(!even)} type="checkbox" label="Only Even" />
                        </Form.Group>
                    </div>

                    <Button variant="secondary" onClick={handleCloseInner}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseInner}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ShowContactsModal;
import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const ModalPopup = ({ children, title, subtitle, show, handleClose, handleDateChange }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} onClick={handleDateChange}>
                <Modal.Header closeButton>
                    <Modal.Title>{title} <small>{subtitle}</small></Modal.Title><i className="fa-solid fa-xmark"></i>
                    {/* <button type="button" className="close" data-dismiss="modal" onClick={handleClose}>×</button> */}
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </>
    )
}
export const ModalButton = ({ handleClose }) => {
    return (
        <>
            {/* <div className="button-submit"> */}
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { { handleClose() } }}>
                    Close
                </Button>
                <Button variant="primary" type="submit">Save
                </Button>
            </Modal.Footer>
            {/* </div> */}
        </>
    )
}
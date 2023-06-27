import React from "react";
import "../styles/Modal.css";

const Modal = ({ title, content, closeBtnText, isShowModal, handleShowModal }) => {
    /* if (isShowModal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    } */
    
    return (
        <>
            { isShowModal && (
                <div className="modal">
                    <div className="overlay" onClick={() => handleShowModal(false)}>
                        <div className="modal-content">
                            <h2>{ title }</h2>
                            { content }
                            <button type="button" onClick={() => handleShowModal(false)}>{ closeBtnText }</button>
                        </div>
                    </div>
                </div>
            )}
        </>);
};

export default Modal;
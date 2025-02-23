import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, project }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
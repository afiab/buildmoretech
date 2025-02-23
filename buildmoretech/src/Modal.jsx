import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, project, onSave }) {
    const [title, setTitle] = useState(project?.title || '');
    const [description, setDescription] = useState(project?.description || '');

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.description);
        }
    }, [project]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ ...project, title, description });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Project</h2>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default Modal;
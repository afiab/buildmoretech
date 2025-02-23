import React, { useState, useEffect } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, project, onSave, onDelete }) {
    const [title, setTitle] = useState(project?.title || '');
    const [description, setDescription] = useState(project?.description || '');

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [project]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ ...project, title, description });
        onClose();
    };

    const handleDelete = () => {
        onDelete(project._id);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{project ? 'Edit Project' : 'Add Project'}</h2>
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
                <div className="modal-buttons">
                    <button onClick={handleSave}>Save</button>
                    {project && <button className="Delete" onClick={handleDelete}>Delete</button>}
                    {!project && <button onClick={onClose}>Cancel</button>}
                </div>
            </div>
        </div>
    );
}

export default Modal;
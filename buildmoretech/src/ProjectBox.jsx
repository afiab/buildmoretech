import React from 'react';
import './ProjectBox.css';

function ProjectBox({ project, onClick, onDelete }) {
    const maxLength = 100;
    const truncatedDescription = project.description.length > maxLength
        ? project.description.substring(0, maxLength) + '...'
        : project.description;

    return (
        <div className="project-box">
            <div onClick={() => onClick(project)}>
                <h3>{project.title}</h3>
                <p>{truncatedDescription}</p>
            </div>
        </div>
    );
}

export default ProjectBox;
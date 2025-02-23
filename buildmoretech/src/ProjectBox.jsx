import React from 'react';
import './ProjectBox.css';

function ProjectBox({ project, onClick }) {
    const maxLength = 100;
    const truncatedDescription = project.description.length > maxLength
        ? project.description.substring(0, maxLength) + '...'
        : project.description;

    return (
        <div className="project-box" onClick={() => onClick(project)}>
            <h3>{project.title}</h3>
            <p>{truncatedDescription}</p>
        </div>
    );
}

export default ProjectBox;
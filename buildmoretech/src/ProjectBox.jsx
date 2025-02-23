import React from 'react';
import './ProjectBox.css';

function ProjectBox({ project, onClick }) {
    return (
        <div className="project-box" onClick={() => onClick(project)}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
        </div>
    );
}

export default ProjectBox;
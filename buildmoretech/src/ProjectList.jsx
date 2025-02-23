import React, { useState } from 'react';
import ProjectBox from './ProjectBox';
import Modal from './Modal';

const projects = [
    { title: 'Project 1', description: 'Description of Project 1' },
    { title: 'Project 2', description: 'Description of Project 2' },
    { title: 'Project 3', description: 'Description of Project 3' },
];

function ProjectList() {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <div className="project-list">
            {projects.map((project, index) => (
                <ProjectBox key={index} project={project} onClick={handleProjectClick} />
            ))}
            <Modal isOpen={!!selectedProject} onClose={handleCloseModal} project={selectedProject} />
        </div>
    );
}

export default ProjectList;
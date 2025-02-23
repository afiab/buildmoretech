import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectBox from './ProjectBox';
import Modal from './Modal';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        // Fetch projects from the API
        axios.get('/api/projects')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the projects!', error);
            });
    }, []);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const handleSaveProject = (updatedProject) => {
        axios.put(`/api/projects/${updatedProject._id}`, updatedProject)
            .then(response => {
                setProjects(projects.map(project => 
                    project._id === updatedProject._id ? updatedProject : project
                ));
            })
            .catch(error => {
                console.error('There was an error updating the project!', error);
            });
    };

    return (
        <div className="project-list">
            {projects.map((project, index) => (
                <ProjectBox key={index} project={project} onClick={handleProjectClick} />
            ))}
            <Modal
                isOpen={!!selectedProject}
                onClose={handleCloseModal}
                project={selectedProject}
                onSave={handleSaveProject}
            />
        </div>
    );
}

export default ProjectList;
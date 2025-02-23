import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectBox from './ProjectBox';
import Modal from './Modal';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

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
        setIsAdding(false);
    };

    const handleAddProjectClick = () => {
        setSelectedProject(null);
        setIsAdding(true);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
        setIsAdding(false);
    };

    const handleSaveProject = (project) => {
        if (isAdding) {
            axios.post('/api/projects', project)
                .then(response => {
                    setProjects([...projects, response.data]);
                })
                .catch(error => {
                    console.error('There was an error adding the project!', error);
                });
        } else {
            axios.put(`/api/projects/${project._id}`, project)
                .then(response => {
                    setProjects(projects.map(p => 
                        p._id === project._id ? project : p
                    ));
                })
                .catch(error => {
                    console.error('There was an error updating the project!', error);
                });
        }
        handleCloseModal();
    };

    const handleDeleteProject = (id) => {
        axios.delete(`/api/projects/${id}`)
            .then(() => {
                setProjects(projects.filter(project => project._id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the project!', error);
            });
    };

    return (
        <div className="project-list">
            <button className="Add" onClick={handleAddProjectClick}><h1>Add Project</h1></button>
            {projects.map((project, index) => (
                <ProjectBox key={index} project={project} onClick={handleProjectClick} />
            ))}
            <Modal
                isOpen={!!selectedProject || isAdding}
                onClose={handleCloseModal}
                project={selectedProject}
                onSave={handleSaveProject}
                onDelete={handleDeleteProject}
            />
        </div>
    );
}

export default ProjectList;
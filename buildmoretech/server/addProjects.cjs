const axios = require('axios');

const projects = [
    { title: 'Example Title', description: 'There will be a description here for the project. Users can click on this to add more materials, like notes, links, and progress.' },
    { title: 'Project Tracker', description: 'This is a project that will help track what projects I am working on so that I can set reasonable deadlines and measure my progress. ' },
    { title: 'Personal Website', description: 'A portfolio site for my projects.' },
    // Add more projects as needed
];

async function addProjects() {
    for (const project of projects) {
        try {
            const response = await axios.post('http://localhost:5001/api/projects', project);
            console.log('Added project:', response.data);
        } catch (error) {
            console.error('Error adding project:', error);
        }
    }
}

addProjects();
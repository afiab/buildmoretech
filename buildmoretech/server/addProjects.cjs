const axios = require('axios');

const projects = [
    { title: 'Project 1', description: 'Description of Project 1' },
    { title: 'Project 2', description: 'Description of Project 2' },
    { title: 'Project 3', description: 'Description of Project 3' },
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
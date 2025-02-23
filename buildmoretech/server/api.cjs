const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from config.env
dotenv.config({ path: './server/config.env' });

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Project = mongoose.model('Project', projectSchema);

// API endpoint to get projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API endpoint to add a project
app.post('/api/projects', async (req, res) => {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
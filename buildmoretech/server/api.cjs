const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

// Load environment variables
dotenv.config({ path: './server/config.env' });

const app = express();
const port = process.env.PORT || 5001;

// CORS configuration
app.use(cors({
    origin: 'http://your-frontend-url.com', // Replace with your frontend URL
    credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const Project = mongoose.model('Project', projectSchema);

// API: Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects." });
    }
});

// API: Add a project
app.post('/api/projects', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) return res.status(400).json({ message: "Title and description are required." });

        const project = new Project({ title, description });
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: "Failed to save project." });
    }
});

// API: Delete all projects
app.delete('/api/projects', async (req, res) => {
    try {
        await Project.deleteMany({});
        res.status(200).json({ message: "All projects deleted." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete projects." });
    }
});

// API: Delete a specific project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found." });

        res.status(200).json({ message: "Project deleted." });
    } catch (error) {
        res.status(400).json({ message: "Invalid project ID." });
    }
});

// API: Update a project
app.put('/api/projects/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProject) return res.status(404).json({ message: "Project not found." });

        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: "Invalid project ID or update data." });
    }
});

// OpenAI Integration
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) return res.status(400).json({ message: "Message is required." });

        const aiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        });

        res.json({ response: aiResponse.choices?.[0]?.message?.content || "No response from AI." });
    } catch (error) {
        console.error("❌ AI Error:", error.message);
        res.status(500).json({ message: "AI response failed.", error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on port: ${port}`);
});
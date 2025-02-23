import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './Assistant.css';
import Header from './header.jsx';
import './header.css';
import ChatBot from 'react-chatbotify';

const flow = {
    "start": {
        "message": "Hello builder! How can I help you today?\n\nYou can type one of the following options:\n- I want to start a new project\n- I want to find resources for my existing project\n- I want to choose my next project",
        "choices": [
            {
                "goto": "start_project",
                "postback": "I want to start a new project"
            },
            {
                "goto": "find_resources",
                "postback": "I want to find resources for my existing project"
            },
            {
                "goto": "choose_next_project",
                "postback": "I want to choose my next project"
            }
        ]
    },
    "start_project": {
        "message": "Great! Taking you to the project page...",
        "action": () => window.location.href = "/projects"
    },
    "find_resources": {
        "message": "Which project are you working on?",
        "input": true,
        "next": (userInput) => fetch(`/api/resources?project=${encodeURIComponent(userInput)}`)
            .then(response => response.json())
            .then(data => ({
                "message": data.resources.length > 0 
                    ? `Here are some resources for ${userInput}:\n${data.resources.join('\n')}`
                    : `Sorry, I couldn't find any resources for ${userInput}. Do you want me to suggest something similar?`
            }))
    },
    "choose_next_project": {
        "message": "Let me find trending project themes for you...",
        "action": () => fetch('/api/trending-projects')
            .then(response => response.json())
            .then(data => ({
                "message": data.projects.length > 0 
                    ? `Here are some trending projects:\n${data.projects.join('\n')}\nWould you like to work on any of these?`
                    : "I couldn't find trending projects right now. Would you like a random suggestion?"
            }))
    },
    "chat": {
        "message": "Ask me anything about projects or resources!",
        "input": true,
        "next": (userInput) => fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        })
        .then(response => response.json())
        .then(data => ({ "message": data.reply }))
    }
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Header />
        <div className="spacer"></div>
        <h1>Chat with your Virtual Assistant!</h1>
        <ChatBot flow={flow} />
    </StrictMode>,
);

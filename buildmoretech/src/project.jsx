import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './header.jsx';
import ProjectList from './ProjectList';
import './header.css';
import './ProjectBox.css';
import './ProjectList.css';
import './Modal.css';
import './project.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Header />
        <div className="spacer"></div>
        <h1>My Projects...</h1>
        <ProjectList />
    </StrictMode>,
);
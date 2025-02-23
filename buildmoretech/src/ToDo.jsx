import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './header.jsx';
import './header.css';
import './ToDo.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Header />
        <div className="spacer"></div>
        <h1>Upcoming Tasks</h1>
    </StrictMode>,
);
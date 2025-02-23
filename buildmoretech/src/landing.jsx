import React, { useState, useEffect } from 'react';

function Landing() {
    const phrases = ["Tech", "Projects", "Animations", "Efficiently", "from Less"];
    const [currentPhrase, setCurrentPhrase] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentPhrase((prev) => prev + phrases[index][charIndex]);
            setCharIndex((prev) => prev + 1);
        }, 200);

        if (charIndex === phrases[index].length) {
            clearTimeout(timeout);
            setTimeout(() => {
                setCurrentPhrase("");
                setCharIndex(0);
                setIndex((prev) => (prev + 1) % phrases.length);
            }, 1000);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, index, phrases]);

    return (
        <div className="landing-container">
            <h1>Build More Tech</h1>
            <h2>Build More {currentPhrase}</h2>
            <a href="project.html">
                <button>Get Started</button>
            </a>
        </div>
    );
}

export default Landing;
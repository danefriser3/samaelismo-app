import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import React from 'react';
import { Link } from 'react-router-dom';

const Start: React.FC = () => (
    <div className="start-container">
        <div className="icon-farmacon">
            {/* Sostituisci con la tua icona animata */}
            <img src="oaa_logo.jpg" alt="Farmacon Icon" />
        </div>
        <h1 className="motto">“ Ante nihili Aequales ”</h1>
        <h1>Welcome to your Samaelite space</h1>
        {/* <div className="links">
            <a href="/codex-adamantis" className="text-link">Codex Adamantis</a>
            <a href="/liber-precis" className="text-link">Liber Precis</a>
            <a href="/cerimonial" className="text-link">Cerimonial</a>
        </div> */}
        <Link to="/home" className="enter-btn">
            Enter the Sanctuary <KeyboardArrowRight />
        </Link>
        <a href="https://www.ordoadamantisatri.com/" className='m-5' target="_blank">
            <u>
                <KeyboardArrowRight />Visit our website<KeyboardArrowLeft /></u>
        </a>
    </div>
);

export default Start;
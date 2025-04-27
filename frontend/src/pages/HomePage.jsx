import React from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const goToPeopleList = () => {
        navigate("/people-list");
    };

    return (
        <div className="home-page">
            <h1>Welcome to the People Management App</h1>
            <p>Manage your people easily - add, edit, delete and search.</p>
            <button className="home-button" onClick={goToPeopleList}>
                Start managing now!
            </button>
        </div>
    );
};

export default HomePage;

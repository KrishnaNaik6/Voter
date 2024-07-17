import './index.css'
import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const toggleDropdown1 = () => {
        setShowDropdown1(!showDropdown1);
    };

    const toggleDropdown2 = () => {
        setShowDropdown2(!showDropdown2);
    };

    return (
        <nav>
            <ul>
                <a href="dashboard">
                    <li>Dashboard</li>
                </a>
                <a href="candidates">
                    <li>Candidates</li>
                </a>
                <a href="votes">
                    <li>Votes</li>
                </a>

            </ul>
        </nav>
    )
}
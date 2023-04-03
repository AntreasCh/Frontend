/**
 * 
 * Navigation Menu
 * @author: Panagiotis Tamboukaris
 */
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
      <span className="nav-logo">International Centre for Connected Construction (IC3)</span>
      <div className={`nav-items ${isOpen && "open"}`}>
        <a href="/">Home</a>
        <a href="/tppfront/activities">Activities</a>
        <a href="/tppfront/resources">Resources</a>
        <a href="/tppfront/community">Community</a>
        <a href="/tppfront/events">Events</a>
        
        <a href="/tppfront/about">About</a>
        <a href="/contactus">Contact</a>
      </div>
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Navbar;
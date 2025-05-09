import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../Component/NavigationBar.css";

function NavigationBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Camping information
                </Link>
                
                <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/holidays">Trips</Link></li>
                      
                        <li><Link to="/destinations">Content</Link></li>
                        <li><Link to="/history">History</Link></li> {/* เพิ่มลิงก์ไปยังหน้าประวัติ */}
                    </ul>
                    <Link to="/" className="sign-in-btn">Sign in</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
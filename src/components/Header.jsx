import React from 'react'
import logo from "../assets/images/logo.jpg";

const header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="logo">
                    <img src={logo} alt="memoapp" />
                </div>
                <div className="title-container">
                    <h1 className="title">MEMO</h1>
                </div>                
            </nav>
            
        </header>
    )
}

export default header

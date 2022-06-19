import React from 'react';

const XNavbar = () => {
    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="brand">
                <a href="index.html"><img src="assets/img/logo-dark.png" alt="Klorofil Logo" className="img-responsive logo"/></a>
            </div>
            <div className="container-fluid">
                <div id="navbar-menu">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><img src="assets/img/user.png" className="img-circle" alt="Avatar"/> <span>Samuel</span> <i className="icon-submenu lnr lnr-chevron-down"></i></a>
                            <ul className="dropdown-menu">
                                <li><a href="#"><i className="lnr lnr-user"></i> <span>My Profile</span></a></li>
                                <li><a href="#"><i className="lnr lnr-envelope"></i> <span>Message</span></a></li>
                                <li><a href="#"><i className="lnr lnr-cog"></i> <span>Settings</span></a></li>
                                <li><a href="#"><i className="lnr lnr-exit"></i> <span>Logout</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default XNavbar
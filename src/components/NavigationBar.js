import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class NavigationBar extends React.Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Nuvola_Red_Plus.svg/1200px-Nuvola_Red_Plus.svg.png" width="50" height="50" /> Health Care System
                </Link>
                <Nav className="mr-auto">
                    
                    <Link to={"register"} className="nav-link">Add User</Link>
                    <Link to={"getall"} className="nav-link">User List</Link>
                    <Link to={"addcenter"} className="nav-link">Add Center</Link>
                    <Link to={"getcenters"} className="nav-link"> Center List</Link>
                    <Link to={"admins"} className="nav-link">Admin list</Link>

                </Nav>
                    <Nav className="navbar-right">
                        <Link to ={"register"} className="nav-link"> Register</Link>
                        <Link to ={"login"} className="nav-link"> Login</Link>

                    </Nav>

            </Navbar>
        );
    }
}
export default NavigationBar;
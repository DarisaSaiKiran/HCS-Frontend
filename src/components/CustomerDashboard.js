import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Footer from './Footer';


class CustomerDashboard extends React.Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Nuvola_Red_Plus.svg/1200px-Nuvola_Red_Plus.svg.png" width="50" height="50" /> Health Care System
                </Link>
                <Nav className="mr-auto">

                    <Link to={"/BookTest"} className="nav-link">Book Appointment</Link>
                    <Link to={"/Status"} className="nav-link">Status</Link>

                </Nav>
                <Nav className="navbar-right">
                    <Link to={"/"} className="nav-link">Logout</Link>

                </Nav>
                <Footer></Footer>

            </Navbar>
        );
    }
}
export default CustomerDashboard;
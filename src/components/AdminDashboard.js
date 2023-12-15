import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Footer from './Footer';


class AdminDashboard extends React.Component {

    render() {
        return (
            <Navbar bg="dark" variant="dark" >
                <Link to={""} className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Nuvola_Red_Plus.svg/1200px-Nuvola_Red_Plus.svg.png" width="50" height="50" /> Health Care System
                </Link>
                <Nav className="mr-auto">
                    
                    <Link to={"/getall"} className="nav-link">User List</Link>
                    <Link to={"/addcenter"} className="nav-link">Add Center</Link>
                    <Link to={"/getcenters"} className="nav-link"> Center List</Link>
                    <Link to={"/test"} className="nav-link">Add Test</Link>
                    <Link to={"/TestList"} className="nav-link">Test List</Link>
                    <Link to={"/AddTesttoCenter"} className="nav-link">Assign</Link>
                    <Link to={"/all"} className="nav-link">Appointment List</Link>
                    {/* <Link to={"/admins"} className="nav-link">AdminList</Link> */}
                    {/* <Link to={"/approved"} className="nav-link">Approved List</Link> */}





                </Nav>
                    <Nav className="navbar-right">
                        <Link to ={"/"} className="nav-link"> Logout</Link>

                    </Nav>
                    <Footer></Footer>


            </Navbar>
            
        );

    }
}
export default AdminDashboard;
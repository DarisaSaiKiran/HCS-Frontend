import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Welcome from './Welcome';
import { Card } from 'react-bootstrap';
import logo from './hcs.webp';
import Footer from './Footer';

var sectionStyle = {
    backgroundImage: `url(${logo})`
 }


class WelcomeDashboard extends React.Component {

    render() {
        return (
            <div style={sectionStyle}>

            
  <div>

            <Navbar bg="dark" variant="dark">
            
                <Link to={""} className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Nuvola_Red_Plus.svg/1200px-Nuvola_Red_Plus.svg.png" width="50" height="50" /> Health Care System
                </Link>
               
                    <Nav className="navbar-right">
                        <Link to ={"AdminLogin"} className="nav-link"> AdminLogin</Link>

                       *{/* <Link to ={"register"} className="nav-link"> Register</Link>*/}
                        <Link to ={"login"} className="nav-link"> CustomerLogin</Link>

                    </Nav>
                    


            </Navbar>
            </div>
            <Footer></Footer>
 
            </div>


            
        );
    }
}
export default WelcomeDashboard;
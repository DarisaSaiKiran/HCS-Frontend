import React from "react";
import { Card,Image } from 'react-bootstrap';
import hcs from './hcs.webp'
import MainLayout from "./MainLayout";
import WelcomeDashboard from "./WelcomeDashboard";
class Welcome extends React.Component {

    render(){
        return (
            <>
            <Card>
            <div className="jumbotron">
                <h1> Welcome to Health Care System</h1>
                <blockquote className="blockquote mb-0">
                <p> </p>
                <footer className="blockquote-footer">
                    
                </footer>
                </blockquote>
            </div>
            <Card.Body>
                <div>
                <img src={hcs} style={{ width: 300, height: 290, }} alt="hcs" />

                </div>
            </Card.Body>
            <Card.Footer>
                <div> Have a good Experience</div>
            </Card.Footer>
            </Card>
            </>
        )
    }
}
export default Welcome;
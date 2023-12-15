import React from 'react';
import { Form, Card, InputGroup, Row, Col, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faEnvelope, faLock, faUndo } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Link, useLocation, useNavigate, useHistory, redirect } from 'react-router-dom';
import MainLayout from './MainLayout';
import { useState } from 'react';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handlesignup = () => {
        navigate('/register')
    }
    const userinfo = { id }
    const handleApi = (e) => {
        console.log({ email, password })
        axios.post("http://localhost:8085/hello/login", JSON.stringify({
            "email": email,
            "password": password,
        }), {
            headers: {
                "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization',
            }
        })
            .then(result => {
                console.log(result);
                if (result.data != 0) {
                    localStorage.setItem('userinfo', result.data);
                    console.log(localStorage);
                    navigate('/CustomerDashboard');
                }
                else {
                    alert("failure");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <Row className="justify-content-md-center">
                <Col xs={4}>
                    <br></br>
                    <br></br>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faSignInAlt} />Login
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Form.Group as={Col} >{'  '}
                                    <InputGroup>
                                        <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                                        <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={handleEmail}
                                            className={"bg-dark text-white"} placeholder="Enter Email address" />
                                    </InputGroup>
                                </Form.Group >
                            </Row>
                            <br></br>
                            <Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                                        <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={handlePassword}
                                            className={"bg-dark text-white"} placeholder="Enter Password" />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign": "left" }}>
                            <Button size="sm" type="button" variant="success" onClick={handleApi}
                            // disabled={this.state.email.length === 0 || this.state.password.length === 0}
                            >                                <FontAwesomeIcon icon={faSignInAlt} /> Login
                            </Button> {' '}
                            {/* <Button size="sm" type="button" variant="info" onClick={this.resetLoginForm}
                            disabled={this.state.email.length === 0 && this.state.password.length === 0}
                        >
                            <FontAwesomeIcon icon={faUndo} /> Reset
                        </Button> */}
                            <Button size="sm" type="button" variant="success" onClick={handlesignup}
                            // disabled={this.state.email.length === 0 || this.state.password.length === 0}
                            >                                <FontAwesomeIcon icon={faSignInAlt} /> Signup
                            </Button> {' '}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Login;
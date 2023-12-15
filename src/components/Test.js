import React from 'react';
import {  Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo  } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import MyToast from './MyToast';
import AdminDashboard from './AdminDashboard';
class Test extends React.Component {


    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.testChange = this.testChange.bind(this);
        this.submitTest= this.submitTest.bind(this);


    }

    initialState = {
        testName: '',
       

    }

    resetTest= () => {
        this.setState(() => this.initialState);
      }



    submitTest = event => {
        event.preventDefault();
        console.log("handle request ");

        const test = {
            testName: this.state.testName,
            

        };

        axios.post("http://localhost:8085/test/addtest", test)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);

                } else {
                    this.setState({ "show": false });
                }
            });
        this.setState(this.initialState);
    }



    testChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { testName } = this.state;

        return (
            <div className='bgad'>
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={ this.state.show} message={"Test Saved Successfully."} type={"success"  } />

                </div>
                <AdminDashboard/>
                <br />
                                <br />

                <Card className='mx-auto' style={{width:'30rem'}}  >
                    <CardHeader  className="p-1 mb-1 bg-dark text-white" ><FontAwesomeIcon icon={faPlusSquare} />Add Test </CardHeader>
                    <form onReset={this.resetTest} onSubmit={this.submitTest} id="testFormId">
                    
                        <Card.Body >

                            <div className="form-group">

                                <label htmlFor="exampleInputTestName1"> Test Name</label>
                                <input controlid="formGridTestName" onChange={this.testChange}  type="testName" name="testName" className="form-control" required autoComplete='off' id="exampleInputTestName1" placeholder="Test Name" />
                            </div>

                           
                           


                        </Card.Body>
                        <Card.Footer style={{ textAlign: "right" }}>

                            <button size="sm" variant="success" type="submit" className="btn btn-primary">
                                <FontAwesomeIcon icon={faSave} />Submit</button>{' '}
                            <button size="sm" variant="info" type="reset" className="btn btn-primary">
                                <FontAwesomeIcon icon={faUndo} /> Reset</button>{ ' '}
                            
                        </Card.Footer>
                    </form>
                </Card>
            </div>
            </div>
        );
    }
}
export default Test;
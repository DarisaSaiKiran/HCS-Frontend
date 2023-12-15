import React from 'react';
import { Card, Form, FormLabel } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import MyToast from './MyToast';
import AdminDashboard from './AdminDashboard';
import { Component } from 'react';
 class AssignTesttoCenter extends React.Component {


    constructor(props) {
        super(props);
        this.state=this.initialstate
        this.state.show = false;

        this.onChange = this.onChange.bind(this);
        this.onTest = this.onTest.bind(this);

        this.submitAssign = this.submitAssign.bind(this);

 this.state={
    assign: [],
        assigntest: [],
 

 }
    }
    initialstate = {
    selectedvalueC:'',
        selectedvalueT:''

    };

    

    componentDidMount() {
        this.assign();
        this.assigntest();
        
    }

 

    assign() {
        axios.get('http://localhost:8085/center/all')
            .then(res => res.data)
            
            .then((data) => {
                this.setState({ assign: data });
                
            });
    }

    // assign() {
    //     axios.get('http://localhost:8085/center/all')
    //         .then(res => console.log(res.data)
    //         )
    // }

    // assigntest() {
    //     axios.get('http://localhost:8085/test/all')
    //         .then(res => console.log(res.data)
    //         )
    // }

    assigntest() {
        axios.get('http://localhost:8085/test/all')
            .then(res => res.data)
            .then((data) => {
                this.setState({ assigntest: data });
            });
    }


    resetTest = () => {
        this.setState(() => this.state);
    }


    submitAssign =(event) => {
        event.preventDefault();
        console.log("sending");

        const req = {
            selectedvalueT: this.state.selectedvalueT
       

        };
    
        const center={
            selectedvalueC:this.state.selectedvalueC
        };
        const url="http://localhost:8085/test/centers/tests/"+this.state.selectedvalueC
        const obj = JSON.stringify({'id':this.state.selectedvalueT});

        axios.post(url,obj,
    
          { headers: {  "Content-Type": "application/json",'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization',
        }
        })
        
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);

                } else {
                    this.setState({ "show": false });
                }
            });
        this.setState(this.initialstate);
    }
    // onChange = (key,id) => {
    //     this.setState({
    //         [key]: id.target.value
    //     });
        
    // }



    onChange = (selectedvalueC) => {
        this.setState({
           selectedvalueC: selectedvalueC.target.value
        });
       
    }
    onTest=(selectedvalueT)=>{
        this.setState({
            selectedvalueT:selectedvalueT.target.value

        });
    }

    render() {
        const { assigntest, assign,selectedvalueC,selectedvalueT } = this.state;

        return (
            <div className='bgad'>
                <div>
                    <div style={{ "display": this.state.show ? "block" : "none" }}>
                        <MyToast show={this.state.show} message={"Assigned sucessfully."} type={"success"} />

                    </div>
                    <AdminDashboard />
                    <br>
          </br>
          <br>
          </br>

                    <Card style={{ display: 'block', 
width:'30rem'                  }} className='mx-auto'   >
                        <CardHeader className="p-2 mb-2 bg-dark text-white"  ><FontAwesomeIcon icon={faPlusSquare} />Assign</CardHeader>

                        <form onReset={this.resetTest} onSubmit={this.submitAssign}                                 
 id="testFormId">

                            <Card.Body>

                                <div className="form-group">
                                    <Form.Select aria-label='Default select example' onChange={this.onChange}>
                                        <option value="" >Select Center Name</option>
                                        {assign.map(center => (
                                            <option key={center.id} value={center.id}>{center.centername}</option>
                                        ))}

                                    </Form.Select>
                                    </div>
                                    <br/>
                                    <br/>
                                    <div className="form-group">
                                    <Form.Select aria-label='Default select example' onChange={this.onTest}>
                                        <option value="" >Select Test Name</option>
                                        {assigntest.map(test => (
                                            <option key={test.id} value={test.id}>{test.testName}</option>
                                        ))}

                                    </Form.Select>
                                    </div>
                                





                            </Card.Body>
                            <Card.Footer style={{ textAlign: "right" }}>

                                <button size="sm" variant="success" type="submit" className="btn btn-primary">
                                    <FontAwesomeIcon icon={faSave} />Submit</button>{' '}
                                <button size="sm" variant="info" type="reset" className="btn btn-primary">
                                    <FontAwesomeIcon icon={faUndo} /> Reset</button>{' '}

                            </Card.Footer>
                        </form>
                    </Card>
                </div>
            </div>
        );
    }
}
export default AssignTesttoCenter;
import React from 'react';
import { Card, Form ,Container} from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import MyToast from './MyToast';
import CustomerLayout from './CustomerLayout';
import CustomerDashboard from './CustomerDashboard';
// import TimePicker from 'react-bootstrap-time-picker';
// import DatePicker from "react-datepicker";
//  import DateTimePicker from 'react-datetime-picker'
class BookTest extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = this.initialState;
      //  this.state.show = false;
        this.centerChange = this.centerChange.bind(this);
        this.testChange = this.testChange.bind(this);
       this.dateChange=this.dateChange.bind(this);
       this.timeChange=this.timeChange.bind(this);
        this.submitBook= this.submitBook.bind(this);


        this.state = {
            assign: [],
            assigntest: []
            

        };
    }


    initialstate = {
        centerid:'',
            testid:'',
            date:'',
            time:''
            
    
        };
        centerChange = (centerid) => {
            this.setState({
                centerid:centerid.target.value
            });
            
        }
        dateChange = (date) => {
            this.setState({
                date:date.target.value
                    });
            
        }
        timeChange = (time) => {
            this.setState({
                time:time.target.value
            });
            
        }
        testChange = (testid) => {
            this.setState({
                 testid:testid.target.value
            });
        }
    
       

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
    getAllUsers() {
        axios.get("http://localhost:8085/hello/getall")
            .then(response => response.data)
            .then((data) => {
                this.setState({ users: data });
            });

    }

    assigntest() {
        axios.get('http://localhost:8085/test/all')
            .then(res => res.data)
            .then((data) => {
                this.setState({ assigntest: data });
            });
    }


    resetBook = () => {
        this.setState(() => this.initialState);
    }



    submitBook =(event) => {
        event.preventDefault();
        console.log("handle request ");


        const userId = localStorage.getItem("userinfo");
        
        const urlap="http://localhost:8085/appointment/"+userId+"/add/"+this.state.centerid+"/"+this.state.testid
        const url=urlap+this.state.centerid+"/"
         const url1=url+this.state.testid
        const datetime=new Date(this.state.date+this.state.time);
        var start = this.state.date +" "+ this.state.time;
        const dt = new Date(start) ;
        console.log(dt);
        console.log(this.state.time)
        const obj = {'timestamp':dt}
        console.log(obj);

        axios.post(urlap,obj, { headers: {  "Content-Type": "application/json",'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization',
       }
       }
        
        )
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
    
    render() {
        const { assigntest, assign,selectedvalueC,selectedvalueT } = this.state;

        return (
            <div className='bgad'>
                <div>
                    <div style={{ "display": this.state.show ? "block" : "none" }}>
                        <MyToast show={this.state.show} message={"Appointment Saved successfully"} type={"success"} />

                    </div>
                    <CustomerDashboard />
                    <Container>
                        <br></br>

                    <Card className='mx-auto' style={{width:'30rem'}}  > 
                 
                        <CardHeader className="p-1 mb-1 bg-dark text-white"><FontAwesomeIcon icon={faPlusSquare} />Book Appointment </CardHeader>

                        <form onReset={this.resetBook} onSubmit={this.submitBook}                                 
 id="testFormId">

                            <Card.Body>
                            

                                <div className="form-group">
                                    <Form.Select aria-label='Default select example' onChange={this.centerChange}>
                                        <option value='' >Select Center Name</option>
                                        {assign.map(center => (
                                            <option key={center.id} value={center.id}>{center.centername}</option>
                                        ))}

                                    </Form.Select>
                                    </div>
                                    <br/>
{/* 
                                    <div className="form-group">
                                     <DateTimePicker onChange={this.dateChange}/>

                                        </div>    
                                        <br/>                                 */}
                                    <div className="form-group">
                                    <Form.Select aria-label='Default select example' onChange={this.testChange}>
                                        <option value='' >Select Test Name</option>
                                        {assigntest.map(test => (
                                            <option key={test.id} value={test.id}>{test.testName}</option>
                                        ))}

                                    </Form.Select>
                                    </div>
                                    <br/>
                                    <div>
                                        {/* <DateTime onChange={this.dateChange} /> */}
                                     <Form.Group controlId="Date">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="Date" name="Date" placeholder="DateTime "  onChange={this.dateChange}/>
                        </Form.Group> 
                        </div>
                        <br/>
                        <div>
                        <Form.Group controlId="time" >

                        <Form.Label>Select Time</Form.Label>
                        <Form.Control type="time" name="time" placeholder="time " onChange={this.timeChange}/>
                        </Form.Group>


                        </div>

                                





                            </Card.Body>
                            <Card.Footer style={{ textAlign: "right" }}>

                                <button size="sm" variant="dark" type="submit" className="btn btn-dark">
                                    <FontAwesomeIcon icon={faSave} />Submit</button>{' '}
                                <button size="sm" variant="warning" type="reset" className="btn btn-warning">
                                    <FontAwesomeIcon icon={faUndo} /> Reset</button>{' '}

                            </Card.Footer>
                        </form>
                    </Card>
                    </Container>
                </div>
            </div>
        );
    }
}
export default BookTest;
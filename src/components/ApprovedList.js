import React from 'react';
import { Card, Table, Image, Form,ButtonGroup, Button,FormControl,InputGroup, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faList, faTrash,faFastBackward,faStepBackward,faFastForward,faStepForward, faRadio, faRecycle, fa1, faAnchor, faAnchorCircleCheck, faCheckCircle, faCancel } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from './MyToast';
import Rejecttoast from './Rejecttoast';
import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';

class ApprovedList extends React.Component {


    constructor(props) {
        super(props);
        this.state=this.initialstate
        this.state = {

            appointment: [],
            approvement:[],
            currentPage: 1,
            appointmentPerPage: 5,
            approve:'Approved',
            reject:'Rejected'
        };
        this.onPage = this.onPage.bind(this);
        this.onRej=this.onRej.bind(this);

    }
    initialstate={
        approve:'',
        reject:''
    }


    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }

    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }

    };



    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.appointment.length / this.state.appointmentPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.appointment.length / this.state.appointmentPerPage)
            });
        }

    };
    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.appointment.length / this.state.appointmentPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }

    };

    componentDidMount() {
        this.getAllappointment();
        
    }

    getAllappointment() {
        axios.get("http://localhost:8085/approvement/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({ appointment: data });
            });

    }






    deleteappointment = (statusid) => {
        axios.delete("http://localhost:8085/appointment/" +statusid)
            .then(response => {
                const status=response.status
                console.log(status)
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        appointment: this.state.appointment.filter(appointment => appointment.id !== statusid)

                    });
                } else{
                    console.log("delete not possible")
                     this.setState({ "show": false });
                }
               
                alert("deleted Successfully")

            });
    };

    onStatus =(appointmentid,status,userid) => {
    
        // const userid=localStorage.getItem('userinfo')
        console.log("sending");

        
                const url="http://localhost:8085/approvement/add/"+appointmentid+"/"+userid
        const obj = JSON.stringify({'status':status});

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
    
    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
            
        });
    };
    onPage=(approve)=>{
        
        this.setState({
            approve:console.log(approve.target.value),
            
        }); 
        // if(approve.target.value=='Approved'){
        //     localStorage.setItem('status',approve.target.value)
        //     var p="pending"
        //     console.log(localStorage)
        //     //  localStorage.removeItem('statusA');
        //     // console.log(localStorage)
        // }
        // else{
        //     localStorage.setItem('status',p) 
        //     console.log(localStorage)
        // }
        
    };
    onRej=(reject)=>{
        
        this.setState({
            reject:console.log(reject.target.value)
        }); 
        // if(reject.target.value=='Rejected')
        // {
        //     var p="pending";
        //     localStorage.setItem('status',reject.target.value)
        //     console.log(localStorage)
        // }
        // else{
        //     localStorage.setItem('status',p);
        // }
        
    };
    




    render() {


        const { appointment, currentPage, appointmentPerPage } = this.state;
        const lastIndex = currentPage * appointmentPerPage;
        const firstIndex = lastIndex - appointmentPerPage;
        const currentappointment = appointment.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(appointment.length / appointmentPerPage);


        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A288",
            color: "#17A288",
            textAlign: "center",
            fontWeight: "bold"
        }

        return (
            <div className='bgad'>
            <div>
                {/* <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={"Appointment Deleted Successfully."} type={"danger"} />

                </div> */}
       <AdminDashboard/>
<Container>
                <Card >
                    <Card.Header  className="p-3 mb-2 bg-primary text-white"><FontAwesomeIcon icon={faList} />Appointments</Card.Header>
                    <Card.Body>
                        <Table stripped bordered hover variant >
                            <thead>
                                <tr>
                                    {/* <th>Profile Photo</th> */}
                                    <th>Appointment Id</th>
                                    <th>Date and Time</th>
                                    <th>User</th>
                                    <th>CenterName</th>
                                    <th>TestName</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    appointment.length === 0 ?


                                        <tr align="center" >
                                            <td colSpan="8">{this.state.appointment.length} Appointments Available</td>
                                        </tr> :
                                        currentappointment.map((approvement) => (
                                            <tr key={approvement.id}>
                                                <td>{approvement.id}</td>
                                                <td>{approvement.status}</td>
                                                {/* <td>{approvement.appointment.user[0].username}</td>
                                                <td>{approvement.appointment[0].center.centername}</td>
                                                <td>{approvement.appointment[0].test.testName}</td> */}

                                                

                                                <td>
                                                    <ButtonGroup>
                                                    {/* <Link to={"/edits/"+center.id} className="btn btn-sm btn-outline-primary" ><FontAwesomeIcon icon ={faEdit}/></Link>{' '}  */}

                                                        {/* <Button  size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{''} */}
                                                        {/* <Button size="sm" variant="outline-danger" onClick={this.deleteappointment.bind(this, appointment.id)}><FontAwesomeIcon icon={faTrash} /></Button> */}
                                                        
                                                        {/* <Form.Check type="radio" aria-label="radio 1" ><FontAwesomeIcon icon={faCheckCircle} /></Form.Check>
                                                        <br/>

                                                        <Form.Check type="radio" aria-label="radio 1" ><FontAwesomeIcon icon={faCancel} /></Form.Check> */}
                                                                                                        <Button size="sm" value="Approved"variant="outline-success"  onClick={this.onStatus.bind(this,appointment.id,'Approved',appointment.user.id)}><FontAwesomeIcon icon={faCheckCircle} />
</Button>     
<div id='1'style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={"Appointment updated"} type={"success"} />

                </div>  
                


                                                        {/* <label class="fancy-radio"  >
        <input type="radio" id="radio1" name='align' htmlFor="radioleft" onChange={this.onPage} value={this.state.approve} />
        <span>Approve</span>
    </label>  
    <label class="fancy-radio">
        <input type="radio" id="radio1" name='align' htmlFor="radioright" value={this.state.reject} onChange={this.onRej}  on/>
        <span>Reject</span>
    </label>   */}

                                                    
                                                   
                
                                                    <ButtonGroup >


<Button size="sm" value="Rejected" variant="outline-danger"  onClick={this.onStatus.bind(this,appointment.id,'Rejected',appointment.user.id)}><FontAwesomeIcon icon={faCancel} /></Button>
  
</ButtonGroup>



                                                       
</ButtonGroup>


                                                </td>
                                               
                                                                                               
                                            </tr>
                                        ))

                                }
                            </tbody>
                        </Table>
                    </Card.Body>


                    <Card.Footer>

                        <div style={{ "float": "left" }}>
                            Showing page {currentPage} of {totalPages}
                        </div>
                        <div style={{ "float": "right" }}>
                            <InputGroup size="sm">
                                {/* <InputGroup.Prepend> */}
                                <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                    onClick={this.firstPage}>
                                    <FontAwesomeIcon icon={faFastBackward} /> First</Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                    onClick={this.prevPage}>
                                    <FontAwesomeIcon icon={faStepBackward} /> Prev</Button>
                                {/* </InputGroup.Prepend> */}
                                <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage} onChange={this.changePage} />
                                {/* <InputGroup.Append> */}
                                <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                    onClick={this.nextPage}>
                                    <FontAwesomeIcon icon={faFastForward} /> Next  </Button>
                                <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                    onClick={this.lastPage}>
                                    <FontAwesomeIcon icon={faStepForward} /> Last  </Button>
                                {/* </InputGroup.Append> */}
                            </InputGroup>
                        </div>
                    </Card.Footer>

                </Card>
                </Container>
            </div>
            </div>
        );

    }
}

export default ApprovedList;
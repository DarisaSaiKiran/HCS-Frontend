import React from 'react';
import { Card, Table, Image, ButtonGroup, Button,InputGroup,FormControl, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faUsers, faList,faFastBackward,faStepBackward,faFastForward,faStepForward } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from './MyToast';
import { Link } from 'react-router-dom'
import AdminDashboard from './AdminDashboard';
import './hcs.css'
import CustomerDashboard from './CustomerDashboard';
 
class Status extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentPage: 1,
            usersPerPage: 5
        };
    }


    firstPage=()=>{
        if(this.state.currentPage>1){
            this.setState({
                currentPage:1
            });
        }

    };

    prevPage=()=>{
        if(this.state.currentPage>1){
            this.setState({
                currentPage:this.state.currentPage-1
            });
        }

    };

   

    lastPage=()=>{
        if(this.state.currentPage<Math.ceil(this.state.users.length/this.state.usersPerPage)){
            this.setState({
                currentPage:Math.ceil(this.state.users.length/this.state.usersPerPage)
            });
        }

    };
    nextPage=()=>{
        if(this.state.currentPage<Math.ceil(this.state.users.length/this.state.usersPerPage)){
            this.setState({
                currentPage:this.state.currentPage+1
            });
        }

    };

    componentDidMount() {
        this.getAllUsers();

    }

    getAllUsers() {
      const userid=localStorage.getItem('userinfo')
        axios.get("http://localhost:8085/approvement/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({ users: data.filter(x => x.appointment.user.id == userid) });
                console.log(this.state.users.filter(x => x.appointment.user.id == userid));
            });
    }


    deleteUser = (userId) => {
        axios.delete("http://localhost:8085/hello/deleteuser/" + userId)
        .then(response => {
            if (response.data != null) {
                this.setState({ "show": true });
                setTimeout(() => this.setState({ "show": false }), 3000);
                this.setState({
                    users:this.state.users.filter(user=>user.id!==userId)

                });
            }else{
                this.setState({"show":false});
            }
           
            });
        };


        changePage=event=>{
            this.setState({
                [event.target.name]:parseInt(event.target.value)
            });
        };


    render() {
      const userid=localStorage.getItem('userinfo')


        const { users, currentPage, usersPerPage } = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = users.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(users.length / usersPerPage);


        const pageNumCss={
            width:"45px",
            border:"1px solid #17A288",
            color:"#17A288",
            textAlign:"center",
            fontWeight:"bold"
        }

        return (
    <div className='bgad'>
            <CustomerDashboard/>
            <div>
                        <div style={{ "display": this.state.show ? "block" : "none" }}>
          <MyToast show={ this.state.show} message={"User Deleted Successfully."} type={"danger"  } />

        </div>
        <Container>
        <Card >
                <Card.Header  className="p-3 mb-2 bg-primary text-white"><FontAwesomeIcon icon={faList} />Appointment Status</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant>
                        <thead>
                            <tr>
                                {/* <th>Profile Photo</th> */}
                                <th>Appointment Id</th>
                                <th>DateTime</th>
                                <th>Center Name</th>
                                <th>Test Name</th>
                                <th>Status</th>
                    
                            </tr>
                        </thead>
                        <tbody>

                            {
                               users.length === 0 ?


                                    <tr align="center" >
                                        <td colSpan="8">{this.state.users.length} No Appointments Available</td>
                                    </tr> :
                                    currentUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.appointment.timestamp}</td>
                                            <td>{user.appointment.center.centername}</td>
                                            <td>{user.appointment.test.testName}</td>
                                            <td>{user.status}</td>

                                            {/* <td>{user.appointment[0].approvement.status}</td> */}
                                            {/* <td>{user.approvement.appointment.timestamp}</td> */}
                                            {/* <td>{user.user_id}</td> */}
                                            



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
                                    <Button type="button" variant="outline-info" disabled={currentPage===1? true:false}
                                    onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward}/> First</Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage===1? true:false}
                                    onClick={this.prevPage}> 
                                    <FontAwesomeIcon icon={faStepBackward}/> Prev</Button>
                                {/* </InputGroup.Prepend> */}
                                <FormControl  style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage} onChange={this.changePage}/>
                                {/* <InputGroup.Append> */}
                                    <Button type="button" variant="outline-info" disabled={currentPage===totalPages ? true:false}
                                    onClick={this.nextPage}> 
                                    <FontAwesomeIcon icon={faFastForward}/> Next  </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage===totalPages ? true:false}
                                    onClick={this.lastPage}> 
                                    <FontAwesomeIcon icon={faStepForward}/> Last  </Button>
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

export default Status;
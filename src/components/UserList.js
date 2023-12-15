import React from 'react';
import { Card, Table, Image, ButtonGroup, Button,InputGroup,FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faUsers, faTrash,faFastBackward,faStepBackward,faFastForward,faStepForward } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from './MyToast';
import { Link } from 'react-router-dom'
import AdminDashboard from './AdminDashboard';
import './hcs.css'
 
class UserList extends React.Component {


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
        axios.get("http://localhost:8085/hello/getall")
            .then(response => response.data)
            .then((data) => {
                this.setState({ users: data });
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
            <AdminDashboard/>
            <div>
                        <div style={{ "display": this.state.show ? "block" : "none" }}>
          <MyToast show={ this.state.show} message={"User Deleted Successfully."} type={"danger"  } />

        </div>
        <Card style={{margin: '0 40px'}}>
                <Card.Header className="p-3 mb-2 bg-primary text-white"><FontAwesomeIcon icon={faUsers} />UserList</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant>
                        <thead>
                            <tr>
                                {/* <th>Profile Photo</th> */}
                                <th>User Id</th>
                                <th>User Name</th>
                                {/* <th>Password </th> */}
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                               users.length === 0 ?


                                    <tr align="center" >
                                        <td colSpan="8">{this.state.users.length} Users Available</td>
                                    </tr> :
                                    currentUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phno}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.age}</td>
                                            

                                            <td>
                                                <ButtonGroup>
                                               <Link to={"/edit/"+user.id} className="btn btn-sm btn-outline-primary" ><FontAwesomeIcon icon ={faEdit}/></Link>{' '} 

                                                    {/* <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{''} */}
                                                    <Button size="sm" variant="outline-danger" onClick={this.deleteUser.bind(this,user.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                </ButtonGroup>

                                            </td>

                                        </tr>
                                    ))

                            }
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer  className="p-1 mb-1 bg-secondary text-white">

                        <div  style={{ "float": "left" }}>
                            Showing page {currentPage} of {totalPages}
                        </div>
                        <div style={{ "float": "right" }}>
                        <InputGroup size="sm">
                                {/* <InputGroup.Prepend> */}
                                    <Button  className="p-1 mb-1 bg-dark text-white" type="button" variant="outline-info" disabled={currentPage===1? true:false}
                                    onClick={this.firstPage}>
                                        <FontAwesomeIcon  icon={faFastBackward}/> First</Button>
                                    <Button  className="p-1 mb-1 bg-dark text-white"  type="button" variant="outline-info" disabled={currentPage===1? true:false}
                                    onClick={this.prevPage}> 
                                    <FontAwesomeIcon icon={faStepBackward}/> Prev</Button>
                                {/* </InputGroup.Prepend> */}
                                <FormControl   className="p-1 mb-1 bg-dark text-white" style={pageNumCss} name="currentPage" value={currentPage} onChange={this.changePage}/>
                                {/* <InputGroup.Append> */}
                                    <Button  className="p-1 mb-1 bg-dark text-white"  type="button" variant="outline-info" disabled={currentPage===totalPages ? true:false}
                                    onClick={this.nextPage}> 
                                    <FontAwesomeIcon icon={faFastForward}/> Next  </Button>
                                    <Button  className="p-1 mb-1 bg-dark text-white" type="button" variant="outline-info" disabled={currentPage===totalPages ? true:false}
                                    onClick={this.lastPage}> 
                                    <FontAwesomeIcon icon={faStepForward}/> Last  </Button>
                                {/* </InputGroup.Append> */}
                            </InputGroup>
                        </div>
                    </Card.Footer>

            </Card>
     
            </div>
            </div>
               );

    }
}

export default UserList;
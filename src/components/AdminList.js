import React from 'react';
import axios from 'axios';
import { Card, FormControl, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputGroup from 'react-bootstrap/InputGroup';
import { faList,faStepBackward,faFastBackward,faStepForward,faFastForward } from '@fortawesome/free-solid-svg-icons'
import { parse } from '@fortawesome/fontawesome-svg-core';




class AdminList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            admins: [],
            currentPage: 1,
            adminsPerPage: 5
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
        if(this.state.currentPage<Math.ceil(this.state.admins.length/this.state.adminsPerPage)){
            this.setState({
                currentPage:Math.ceil(this.state.admins.length/this.state.adminsPerPage)
            });
        }

    };
    nextPage=()=>{
        if(this.state.currentPage<Math.ceil(this.state.admins.length/this.state.adminsPerPage)){
            this.setState({
                currentPage:this.state.currentPage+1
            });
        }

    };

    componentDidMount() {
        this.findAllRandomAdmins();
    }

    findAllRandomAdmins() {
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
            .then(response => response.data)
            .then((data) => {
                this.setState({ admins: data });
            });
    };

    changePage=event=>{
        this.setState({
            [event.target.name]:parseInt(event.target.value)
        });
    };

    render() {
        const { admins, currentPage, adminsPerPage } = this.state;
        const lastIndex = currentPage * adminsPerPage;
        const firstIndex = lastIndex - adminsPerPage;
        const currentAdmins = admins.slice(firstIndex, lastIndex);
        const totalPages = admins.length / adminsPerPage;


        const pageNumCss={
            
            width:"45px",
            border:"1px solid #17A288",
            color:"#17A288",
            textAlign:"center",
            fontWeight:"bold"
        }


        return (
            <div>

                <Card >
                    <Card.Header><FontAwesomeIcon icon={faList} />AdminList</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant>
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Address</td>
                                    <td>Created</td>
                                    <td>Balance</td>
                                </tr>
                            </thead>

                            <tbody>
                                {admins.length === 0 ?

                                    <tr align="center">
                                        <td colSpan="6">No Admins Available</td>

                                    </tr> :
                                    currentAdmins.map((admin, index) => (
                                        <tr key={index}>
                                            <td>{admin.first}{' '}{admin.last}</td>
                                            <td>{admin.email}</td>
                                            <td>{admin.address}</td>
                                            <td>{admin.created}</td>
                                            <td>{admin.balance}</td>
                                        </tr>
                                    )
                                    )
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

            </div>
        )
    }
}
export default AdminList;
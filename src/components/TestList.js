import React from 'react';
import { Card, Table, Image, ButtonGroup, Button,FormControl,InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faList, faTrash,faFastBackward,faStepBackward,faFastForward,faStepForward } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from './MyToast';
import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';

class TestList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            tests: [],
            currentPage: 1,
            centersPerPage: 5
        };
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
        if (this.state.currentPage < Math.ceil(this.state.tests.length / this.state.centersPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.tests.length / this.state.centersPerPage)
            });
        }

    };
    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.tests.length / this.state.centersPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }

    };

    componentDidMount() {
        this.getAllTests();

    }

    getAllTests() {
        axios.get("http://localhost:8085/test/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({ tests: data });
            });

    }



    updateTest = (testId) => {
        testId.preventDefault();
        console.log("handle request ");

        const test = {
            testName: this.state.testName,
           

        };

        axios.post("http://localhost:8085/test/update/"+testId)
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


    deleteTest = (testId) => {
        axios.delete("http://localhost:8085/test/" + testId)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        tests: this.state.tests.filter(test => test.id !== testId)

                    });
                } else {
                    this.setState({ "show": false });
                }

            });
    };

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };





    render() {


        const { tests, currentPage, centersPerPage } = this.state;
        const lastIndex = currentPage * centersPerPage;
        const firstIndex = lastIndex - centersPerPage;
        const currentTests = tests.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(tests.length / centersPerPage);


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
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={"Test Deleted Successfully."} type={"danger"} />

                </div>
<AdminDashboard/>

                <Card className='mx-auto' style={{width:'60rem'}} >
                    <Card.Header  className="p-3 mb-2 bg-primary text-white"><FontAwesomeIcon icon={faList} />TestList</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant>
                            <thead>
                                <tr>
                                    {/* <th>Profile Photo</th> */}
                                    <th>Test Id</th>
                                    <th>Test Name</th>
                        
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    tests.length === 0 ?


                                        <tr align="center" >
                                            <td colSpan="8">{this.state.tests.length} Tests Available</td>
                                        </tr> :
                                        currentTests.map((test) => (
                                            <tr key={test.id}>

                                                <td>{test.id}</td>
                                                <td>{test.testName}</td>
                                                
                                                

                                                <td>
                                                    <ButtonGroup>
                                                    {/* <Link to={"/editts/"+test.id} className="btn btn-sm btn-outline-primary" ><FontAwesomeIcon icon ={faEdit}/></Link>{' '}*/} 

                                                        {/* <Button  size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{''}  */}
                                                        <Button size="sm" variant="outline-danger" onClick={this.deleteTest.bind(this, test.id)}><FontAwesomeIcon icon={faTrash} /></Button>
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
                                    <Button type="button" variant="outline-info" disabled={currentPage===totalPages ? true:false}
                                    onClick={this.lastPage}> 
                                    <FontAwesomeIcon icon={faStepForward} /> Last  </Button>
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

export default TestList;
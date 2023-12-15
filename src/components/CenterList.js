import React from 'react';
import { Card, Table, Image, ButtonGroup, Button,FormControl,InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faList, faTrash,faFastBackward,faStepBackward,faFastForward,faStepForward } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from './MyToast';
import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';

class CenterList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            centers: [],
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
        if (this.state.currentPage < Math.ceil(this.state.centers.length / this.state.centersPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.centers.length / this.state.centersPerPage)
            });
        }

    };
    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.centers.length / this.state.centersPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }

    };

    componentDidMount() {
        this.getAllCenters();

    }

    getAllCenters() {
        axios.get("http://localhost:8085/center/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({ centers: data });
            });

    }



    updateCenter = (centerId) => {
        centerId.preventDefault();
        console.log("handle request ");

        const center = {
            centername: this.state.centername,
            city: this.state.city,
            address: this.state.address,
            contact:this.state.contact

        };

        axios.post("http://localhost:8085/center/update/"+centerId)
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


    deleteCenter = (centerId) => {
        axios.delete("http://localhost:8085/center/" + centerId)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        centers: this.state.centers.filter(center => center.id !== centerId)

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


        const { centers, currentPage, centersPerPage } = this.state;
        const lastIndex = currentPage * centersPerPage;
        const firstIndex = lastIndex - centersPerPage;
        const currentCenters = centers.slice(firstIndex, lastIndex);
        const totalPages =Math.ceil( centers.length / centersPerPage);


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
                    <MyToast show={this.state.show} message={"Center Deleted Successfully."} type={"danger"} />

                </div>
<AdminDashboard/>

                <Card className="p-3 mb-2 bg-white text-white" style={{margin: '0 20px'}}>
                    <Card.Header className="p-3 mb-2 bg-primary text-white"><FontAwesomeIcon icon={faList} />CenterList</Card.Header>
                    <Card.Body >
                        <Table bordered hover striped variant>
                            <thead>
                                <tr>
                                    {/* <th>Profile Photo</th> */}
                                    <th>Center Id</th>
                                    <th>Center Name</th>
                                    <th>Contact </th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    centers.length === 0 ?


                                        <tr align="center" >
                                            <td colSpan="8">{this.state.centers.length} Centers Available</td>
                                        </tr> :
                                        currentCenters.map((center) => (
                                            <tr key={center.id}>

                                                <td>{center.id}</td>
                                                <td>{center.centername}</td>
                                                <td>{center.contact}</td>
                                                <td>{center.address}</td>

                                                <td>{center.city}</td>
                                                

                                                <td>
                                                    <ButtonGroup>
                                                    {/* <Link to={"/edits/"+center.id} className="btn btn-sm btn-outline-primary" ><FontAwesomeIcon icon ={faEdit}/></Link>{' '}  */}

                                                        {/* <Button  size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>{''} */}
                                                        <Button size="sm" variant="outline-danger" onClick={this.deleteCenter.bind(this, center.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                    </ButtonGroup>

                                                </td>

                                            </tr>
                                        ))

                                }
                            </tbody>
                        </Table>
                    </Card.Body>


                    <Card.Footer  className="p-3 mb-2 bg-dark text-white">

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
            </div>
            </div>
        );

    }
}

export default CenterList;
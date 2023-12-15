import React from 'react';
import {  Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo  } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import MyToast from './MyToast';
import AdminDashboard from './AdminDashboard';
import './hcs.css'
class Center extends React.Component {


    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.centerChange = this.centerChange.bind(this);
        this.submitCenter = this.submitCenter.bind(this);


    }

    initialState = {
        centername: '',
        city: '',
        address: '',
        contact:''

    }

    resetCenter= () => {
        this.setState(() => this.initialState);
      }



    submitCenter = event => {
        event.preventDefault();
        console.log("handle request ");

        const center = {
            centername: this.state.centername,
            city: this.state.city,
            address: this.state.address,
            contact:this.state.contact

        };

        axios.post("http://localhost:8085/center/addcenter", center)
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



    centerChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { centername, city, address,contact } = this.state;

        return (
            <div className='bgad'>
                
            <div>
                
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={ this.state.show} message={"Center Saved Successfully."} type={"success"  } />

                </div>
                <AdminDashboard/>
                <br />
                                <br />
                <Card className='mx-auto' style={{width:'30rem'}}  > 
                   
              
                    <CardHeader  className="p-1 mb-1 bg-dark text-white" ><FontAwesomeIcon icon={faPlusSquare} />Add Center </CardHeader>
                    <form onReset={this.resetCenter} onSubmit={this.submitCenter} id="centerFormId">
                    
                        <Card.Body >

                            <div className="form-group">

                                <label htmlFor="exampleInputCenterName1"> Center Name</label>
                                <input controlid="formGridCenterName" onChange={this.centerChange}  type="centername" name="centername" className="form-control" required autoComplete='off' id="exampleInputCenterName1" placeholder="Center Name" />
                            </div>

                           
                            <div className="form-group">
                                <label htmlFor="exampleInputCity1">City</label>
                                <input controlid="formGridCity" onChange={this.centerChange}  type="city" name="city" className="form-control" required autoComplete='off' id="exampleInputCity1" placeholder="City" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputAddress1">Address</label>
                                <input controlid="formGridAddress" onChange={this.centerChange}  type="address" name="address" className="form-control" required autoComplete='off' id="exampleInputAddress1" placeholder="Address" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputContact1">Center Contact</label>
                                <input controlid="formGridContact" onChange={this.centerChange}  type="contact" name="contact" className="form-control" required autoComplete='off' id="exampleInputContact1" placeholder="Center Contact" />
                            </div>


                        </Card.Body>
                        <Card.Footer style={{ textAlign: "right" }}>

                            <button size="sm" variant="success" type="submit" className="btn btn-primary">
                                <FontAwesomeIcon icon={faSave} />Submit</button>{' '}
                            <button size="sm" variant="info" type="reset" className="btn btn-primary">
                                <FontAwesomeIcon icon={faUndo} /> Reset</button>{ ' '}
                            
                        </Card.Footer >
                    </form>
                </Card>
                
            </div>
            </div>
        );
    }
}
export default Center;
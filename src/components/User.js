import React from 'react';
import { Form, Card } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo, faList } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import MyToast from './MyToast';
import MainLayout from './MainLayout';
import WelcomeDashboard from './WelcomeDashboard';
class User extends React.Component {


  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.userChange = this.userChange.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }


  initialState = {
    id: "",
    username: "",
    password: "",
    email: "",
    phno: "",
    age: "",
    gender: "",
    role: ""
  }



  resetUser = () => {
    this.setState(() => this.initialState);
  }

  submitUser = event => {
    event.preventDefault();
    console.log("handle request ");

    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      phno: this.state.phno,
      age: this.state.age,
      gender: this.state.gender,
      role: this.state.role
    };

    axios.post("http://localhost:8085/hello/register", user)
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



  userChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  userList = () => {
    return this.props.history.push("/getall");
  }

  render() {
    const { username, password, email, phno, age, gender, role } = this.state;

    return (
      <>
        <div>
          <div style={{ "display": this.state.show ? "block" : "none" }}>
            <MyToast show={this.state.show} message={"User Saved Successfully."} type={"success"} />
          </div>
          <br>
          </br>
          <br></br>

          <Card className='mx-auto' style={{ width: '30rem' }}>
            <CardHeader className="p-2 mb-2 bg-dark text-white" ><FontAwesomeIcon icon={faPlusSquare} />Add New User </CardHeader>

            <form onReset={this.resetUser} onSubmit={this.submitUser} id="userFormId">
              <Card.Body>


                <div className='row'>
                  <div className='col'>
                    <div className="form-group" >
                      
                      <label  htmlFor="exampleInputUsername1">Username</label>
                      <input  controlid="formGridUsername"
                        value={username}
                        onChange={this.userChange}
                        type="username"
                        name="username"
                        className="form-control" required
                        autoComplete='off'
                        id="exampleInputUsername1"
                        placeholder="Username" />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input controlid="formGridPassword"
                        value={password}
                        onChange={this.userChange}
                        type="password"
                        name="password"
                        className="form-control" required
                        autoComplete='off'
                        id="exampleInputPassword1"
                        placeholder="Password" />
                    </div>
                  </div>
                </div>


                <div className='row'>
                  <div className='col'>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email</label>
                      <input controlid="formGridEmail"
                        value={email}
                        onChange={this.userChange}
                        type="email"
                        name="email"
                        className="form-control" required
                        autoComplete='off'
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email" />
                      {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                  </div>

                 
                  <div className='col'>

                <div className="form-group">
                  <label htmlFor="exampleInputAge1">Age</label>
                  <input controlid="formGridAge"
                    value={age}
                    onChange={this.userChange}
                    type="age"
                    name="age"
                    className="form-control" required
                    autoComplete='off'
                    id="exampleInputAge1"
                    placeholder="Age" />
                </div>
                </div>

                {/* <div className='col'> */}
                    <div className="form-group">
                      <label htmlFor="exampleInputphno1">Contact</label>
                      <input controlid="formGridContact"
                        value={phno}
                        onChange={this.userChange}
                        type="phno"
                        name="phno"
                        className="form-control" required
                        autoComplete='off'
                        id="exampleInputphno1"
                        aria-describedby="phnoHelp"
                        placeholder="Contact" /> 
                      {/* <small id="phnoHelp" className="form-text text-muted">We'll never share your phone number with anyone else.</small> */}
                    </div>
                  </div>

          
                <Form.Group controlId='gender'>
                  <Form.Label >Gender</Form.Label>
                  <Form.Select  name='gender' value= {gender} onChange={this.userChange} placeholder='Select Gender'>
                    <option selected disabled value=""> Select Gender</option>
                    <option className="text-primary" value='MALE'>Male</option>
                    <option  className="text-danger" value='FEMALE'>Female</option>
                    <option className="text-dark" value='NA'>Prefer not to say</option>
                  </Form.Select>
                </Form.Group>


                <Form.Group controlId='role'>
                  <Form.Label>Role</Form.Label>
                  <Form.Select   className="text-dark"name='role' value= {role} onChange={this.userChange} placeholder='Select Role'>
                    <option  selected disabled value=""> Select Role</option>
                    <option value='USER'>User</option>
                  </Form.Select>
                </Form.Group>

              </Card.Body>
              <Card.Footer style={{ textAlign: "right" }}>

                <button size="sm" variant="success" type="submit" className="btn btn-primary">
                  <FontAwesomeIcon icon={faSave} onClick={this.submitUser} />Submit</button>{' '}
                <button size="sm" variant="info" type="reset" className="btn btn-primary">
                  <FontAwesomeIcon icon={faUndo} /> Reset</button>{' '}
              </Card.Footer>
            </form>
          </Card>
        </div>
      </>
    );
  }
}
export default User;
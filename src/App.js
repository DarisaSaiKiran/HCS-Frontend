// import logo from './logo.svg';
import './App.css';

import NavigationBar from './components/NavigationBar';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Welcome from './components/Welcome';
import User from './components/User';
import UserList from './components/UserList';
import Footer from './components/Footer';
import Center from './components/Center';
import CenterList from './components/CenterList';
import AdminList from './components/AdminList';
import Status from './components/Status';
import Login from './components/Login';
import WelcomeDashboard from './components/WelcomeDashboard'
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import MainLayout from './components/MainLayout';
import AdminLayout from './components/AdminLayout';
import CustomerDashboard from './components/CustomerDashboard';
import Test from './components/Test';
import AssignTesttoCenter from './components/AssignTesttoCenter';
import TestList from './components/TestList';
import CustomerLayout from './components/CustomerLayout';
import BookTest from './components/BookTest';
import AppointmentList from './components/AppoinmentList';
import ApprovedList from './components/ApprovedList';


function App() {
  const marginTop = {
    marginTop: "20px"
  };

  return (
   

    <Router>
   
       
      <Routes>
      <Route path="/" element={<MainLayout />} >
      <Route path="/WelcomeDashboard" element={<WelcomeDashboard/>} />
      <Route path="/AdminLogin"  element={<AdminLogin/>} />


<Route path="/login"  element={<Login/>} />
<Route path="/register" element={<User/>} />

         
          </Route>

          <Route path="/" element={<AdminLayout/>} >
          <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
          </Route>

         {/*  <Route path="/" element= {<AdminDashboard/>}>
</Route>*/}

<Route path="/addcenter" exact element={<Center/>} />

          <Route path="/edit/:id"  element={<User/>} />
          <Route path="/edits/:id"  element={<Center/>} />
              <Route path="/getall"  element={<UserList/>}  />
              <Route path="/test" exact element={<Test/>} />
              <Route path="/getcenters"  element={<CenterList/>} exact  />
              <Route path="/admins"  element={<AdminList/>} />
              <Route path="/AddTesttoCenter"  element={<AssignTesttoCenter/>} />
              <Route path="/TestList"  element={<TestList/>} />
              <Route path="/all"  element={<AppointmentList/>} />
              <Route path="/admins"  element={<AdminList/>} />
              {/* <Route path="/approved"  element={<ApprovedList/>} /> */}


              <Route path="/addcenter"  element={<Center/>} />
              <Route path="/" element={<CustomerLayout/>}>
          <Route path="/CustomerDashboard" element={<CustomerDashboard/>}/>
          
          </Route>
          <Route path="/BookTest"  element={<BookTest/>} />
          <Route path="/Status"  element={<Status/>} />


         
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />

     </Routes>
         
       
     
    </Router>

  );
}

export default App;


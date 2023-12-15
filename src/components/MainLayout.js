import { Outlet } from "react-router-dom";
import WelcomeDashboard from "./WelcomeDashboard";
import './hcs.css'
 

const MainLayout = () => {
  return (

<div className="bg">  
    <WelcomeDashboard />
    <Outlet/>
    </div>
  )
};

export default MainLayout;

// import logo from './logo.svg';
import './App.css';
import CompanyOrders from "./Components/CompanyOrders";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./Components/NavBar";
import SignIn from "./Components/SignIn";
import Dashboard from "./Components/Dashboard";
import ManageInventory from "./Components/ManageInventory";
import TrackOrderRawMaterials from "./Components/TrackOrderRawMaterials";
import ScheduleProduction from "./Components/ScheduleProduction";
import RawMaterialProvider from "./Components/RawMaterialProvider";
import RawMaterialProviderDashboard from "./Components/RawMaterialProviderDashboard";
import AssessProduction from "./Components/AssessProduction";
import WelcomePage from "./Components/WelcomePage";
import CompanySignup from "./Components/CompanySignup";
import CompanyDashboard from "./Components/CompanyDashboard";
import Inventory from "./Components/Inventory";
import SeemsanSignup from "./Components/SeemsanSignup";
import Choosing from "./Components/Choosing";

function App() {
  return (
      <div className="App font-container">

        <Router>
          <NavBar/>
          <div className={'route-transition'}>
            <Routes>
              <Route exact path="/" element={<WelcomePage/>}/>
              <Route exact path="/Signin" element={<SignIn/>}/>
              <Route exact path="/SignUpType" element={<Choosing/>}/>
              <Route exact path="/098213@SeemsanSignup" element={<SeemsanSignup/>}/>
              <Route exact path="/Dashboard" element={<Dashboard/>}/>
              <Route exact path="/ManageInventory" element={<ManageInventory/>}/>
              <Route exact path="/Inventory" element={<Inventory/>}/>
              <Route exact path="/TrackOrderRawMaterials" element={<TrackOrderRawMaterials/>}/>
              <Route exact path="/ScheduleProduction" element={<ScheduleProduction/>}/>
              <Route exact path="/RawMaterialProvider" element={<RawMaterialProvider/>}/>
              <Route exact path="/ProviderDashboard" element={<RawMaterialProviderDashboard/>}/>
              <Route exact path="/AssessProduction" element={<AssessProduction/>}/>
              {/*<Route exact path="/Report/:id" element={<Report/>}/>*/}
              <Route exact path="/CompanyOrders" element={<CompanyOrders/>}/>
              <Route exact path="/CompanySignup" element={<CompanySignup/>}/>
              <Route exact path="/CompanyDashboard" element={<CompanyDashboard/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;

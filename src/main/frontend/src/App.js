// import logo from './logo.svg';
import './App.css';
import CompanyOrders from "./Components/CompanyOrders";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavBar from "./Components/NavBar";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import ManageInventory from "./Components/ManageInventory";
import TrackOrderRawMaterials from "./Components/TrackOrderRawMaterials";
import ScheduleProduction from "./Components/ScheduleProduction";
import RawMaterialProvider from "./Components/RawMaterialProvider";
import RawMaterialProviderDashboard from "./Components/RawMaterialProviderDashboard";
import AssessProduction from "./Components/AssessProduction";

function App() {
  return (
      <div className="App font-container">

        <Router>
          <NavBar/>
          <div className={'route-transition'}>
            <Routes>
              {/*<Route exact path="/" element={<Dashboard/>}/>*/}
              <Route exact path="/Signup" element={<Signup/>}/>
              <Route exact path="/Dashboard" element={<Dashboard/>}/>
              <Route exact path="/ManageInventory" element={<ManageInventory/>}/>
              <Route exact path="/TrackOrderRawMaterials" element={<TrackOrderRawMaterials/>}/>
              <Route exact path="/ScheduleProduction" element={<ScheduleProduction/>}/>
              <Route exact path="/RawMaterialProvider" element={<RawMaterialProvider/>}/>
              <Route exact path="/ProviderDashboard" element={<RawMaterialProviderDashboard/>}/>
              <Route exact path="/AssessProduction" element={<AssessProduction/>}/>
              {/*<Route exact path="/Report/:id" element={<Report/>}/>*/}
              <Route exact path="/CompanyOrders" element={<CompanyOrders/>}/>
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;

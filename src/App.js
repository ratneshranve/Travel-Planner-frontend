import './App.css';
 import { Route,Routes } from 'react-router-dom';
 import Nav from './components/NavComponent/Nav';
 import Register from './components/RegisterComponent/Register';
 import CpAdmin from './components/CpAdminComponent/CpAdmin';
 import Login from './components/LoginComponent/Login';
 import Logout from './components/LogoutComponent/Logout';
 import Footer from './components/FooterComponent/Footer';
import UserWel from './components/UserWelComponent/UserWel';
import CpUser from './components/CpUserComponent/CpUser';
import Home from './components/HomeComponent/Home';
import Itinerary from './components/ItineraryComponent/Itinerary';
import TravelPlan from './components/TravelPlanComponent/TravelPlan';
import ManageUser from './components/ManageusersComponent/ManageUser';
import Admin from './components/AdminComponent/Admin';
function App() {
  return (
    <>
<Nav/>
<Routes>
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/user" element={<UserWel/>}></Route>
  <Route path="/logout" element={<Logout/>}></Route>
  <Route path="cpuser" element={<CpUser/>}></Route>
  <Route path="cpadmin" element={<CpAdmin/>}></Route>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/register" element={<Register/>}></Route>
  <Route path="/itinerary" element={<Itinerary/>}></Route>
  <Route path="/travelplan" element={<TravelPlan/>}></Route>
   <Route path="/manageusers" element={<ManageUser/>}></Route> 
   <Route path="/admin" element={<Admin/>}></Route>
   
</Routes>
<Footer/>
    </>
  );
}

export default App;

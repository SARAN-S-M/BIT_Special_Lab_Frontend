import { Routes, Route } from "react-router-dom";
import Home from "./home/admin";
import Users from "./users/users";
// import LabBooking from './SpecialLabs';
// import LabDetails from "./LabDetails";
// import MenuBar from "../menu/Sidebar";
// import LabChange from "./pages/LabChange";
// import SpecialSlot from "./pages/SpecialSlot";
// import Help from "./pages/Help";
// import Dashboard from "./pages/Dashboard";
// import Load from "../loading/Loadingscreen";
// import NotFoundPage from "../404";

function Admin() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="users" element={<Users />} />
            {/* <Route path="admin" element={<Dashboard />} />            
            <Route path="admin/specialLabFaculty" element={<LabBooking />} />
            <Route path="admin/specialLabFaculty/:id" element={<LabDetails />} />
            <Route path="admin/User" element={<LabChange />} />
            <Route path="admin/helpmaterials" element={<Help />} />            
            <Route path="MenuBar" element={<MenuBar />} />
            <Route path="Load" element={<Load />} />        
            <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
    );
}

export default Admin;

import { Routes, Route } from "react-router-dom";
// import SupervisorDashboard from "./dashboard";
// import StudentDetailsPage from "./StudentDetails";
import LabBooking from './SpecialLabs'
import LabDetails from "./LabDetails";
import MenuBar from "../menu/Sidebar";
import LabChange from "./pages/LabChange";
import SpecialSlot from "./pages/SpecialSlot";
import Help from "./pages/Help";
import Dashboard from "./pages/Dashboard";

import Load from "../loading/Loadingscreen";

import NotFoundPage from "../404";

function Supervisor() {
    return (
        <Routes>
            <Route path="LabBooking" element={<LabBooking />} />
            <Route path="LabBooking/:id" element={<LabDetails />} />
            <Route path="MenuBar" element={<MenuBar />} />
            <Route path="Load" element={<Load />} />
            <Route path="LabChange" element={<LabChange />} />
            <Route path="SpecialSlot" element={<SpecialSlot />} />
            <Route path="Help" element={<Help />} />
            <Route path="DashBoard" element={<Dashboard />} />

            {/* <Route path="dashboard" element={<SupervisorDashboard />} /> */}
            {/* <Route path= "StudentDetailsPage/:id" element ={<StudentDetailsPage/>}/> */}

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Supervisor;
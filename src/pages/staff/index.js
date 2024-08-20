import { Routes, Route } from "react-router-dom";
import SpecialLab from './SpecialLab'; // Special Lab as the landing page
import StudentInterview from "./StudentInterview";
import StudentRegistration from "./StudentRegistration";
// import MenuBar from "../menu/Sidebar";
// import Load from "../loading/Loadingscreen";
// import NotFoundPage from "../404";

function Staff() {
    return (
        <Routes>
            <Route path="/" element={<SpecialLab />} /> 
            <Route path="StudentInterview" element={<StudentInterview />} />
            <Route path="StudentRegistration" element={<StudentRegistration />} />
            {/* Special Lab as the landing page */}
            {/* 
            
            <Route path="MenuBar" element={<MenuBar />} />
            <Route path="Load" element={<Load />} />
            <Route path="*" element={<NotFoundPage />} />  */}
            {/* Catch-all for undefined routes */}
        </Routes>
    );
};

export default Staff;

import { Routes, Route } from "react-router-dom";
import Home from "./home/admin";
import Users from "./users/users";
import SpecialLabs from "./specialLabs/specialLabs";
import SpecialLabsDetails from "./specialLabDetails/specialLabDetails";
import Help from "./Help/help";
import NotFoundPage from "../404";

function Admin() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="specialLabs" element={<SpecialLabs />} />
            <Route path="LabDetails/:id" element={<SpecialLabsDetails />} />
            <Route path="helpMaterials" element={<Help />} />  
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default Admin;

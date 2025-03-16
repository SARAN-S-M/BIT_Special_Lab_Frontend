 /* eslint-disable */
 import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";

 import Login from "./pages/login";
 import NotFoundPage from "./pages/404";
 import Student from "./pages/student";
 import Staff from "./pages/staff";
 import Admin from "./pages/admin/";
 import Mentor from "./pages/mentor/mentor";
 import Role from "./pages/role/role"
 
 // Add the route here if there is no need for user's identity
 function AppRoutes() {
     return (
         <Routes>
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
            {/* <Route path="/login" element={<Login />}/> */}
            <Route path="/" element={<Login />}/>
         </Routes>
     );
 };
 
 // Add the route here for an authenticated user session
 
 function ProtectedRoutes() {
     return (
         <Routes>
              <Route path="/" element={<ProtectedRoute />}>

                    <Route path="student/*" element={<Student />} />
                    <Route path="faculty/*" element={<Staff />} />
                    <Route path="Admin/*" element={<Admin />} />
                    <Route path="mentor/*" element={<Mentor />} />
                    <Route path="role" element={<Role />} />

 
                  <Route path="logout" element={<Logout />} />
                  <Route path="*" element={<NotFoundPage />} />
              </Route>
          </Routes>
     );
 }
 
 function ProtectedRoute() {
    //  const result =  localStorage.getItem("authToken") !== null;

     const result = "testing";
 
    //  return (result ? <Outlet /> : <Navigate to="/login" />);
     return (result ? <Outlet /> : <Navigate to="/" />);
 };
 
 function Logout() {
     localStorage.removeItem("authToken");
    //  return <Navigate to="/login" />;
     return <Navigate to="/" />;
 }
 
 export { AppRoutes, ProtectedRoutes, Logout };
 
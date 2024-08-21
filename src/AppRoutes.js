 /* eslint-disable */
 import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom";

 import Login from "./pages/login";
 import NotFoundPage from "./pages/404";
 import Student from "./pages/student";
 import Staff from "./pages/staff";
 import Admin from "./pages/admin/admin";
 import Mentor from "./pages/mentor/mentor";
 
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
 
                  {/* <Route path="admin" element={<Navigate to={"dashboard"} />} />
                  <Route path="staff" element={<Navigate to={"dashboard"} />} />
                  <Route path="student" element={<Navigate to={"dashboard"} />} />
                  <Route path="supervisor" element={<Navigate to={"dashboard"} />} />
                 
                  <Route path="admin/*" element={<Admin />} />
                  <Route path="staff/*" element={<Staff />} />
                  <Route path="student/*" element={<Student />} />
                  <Route path="supervisor/*" element={<Supervisor />} />
 
                  <Route path="questions/:testId" element={<Questions />} /> */}

                    <Route path="student/*" element={<Student />} />
                    <Route path="teacher/*" element={<Staff />} />
                    <Route path="Admin/*" element={<Admin />} />
                    <Route path="mentor/*" element={<Mentor />} />

 
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
 
import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "./pages/EmployeeList";
import AddEmployees from "./pages/AddEmployees";
import EmployeeDetails from "./pages/EmployeeDetails";
// import EmployeeDetails from "./pages/EmployeeDetails";
// import AddEmployee from "./pages/AddEmployee";

const App = () => {
  return (
    <div className="p-6">
      <Routes>
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/add-employee" element={<AddEmployees />} />
        <Route path="*" element={<EmployeeList />} />
      </Routes>
    </div>
  );
};

export default App;

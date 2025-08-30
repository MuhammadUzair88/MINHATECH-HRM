import React, { useState } from "react";
import { useEmployee } from "../context/EmployeeContext";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const { employeesData, setEmployeesData } = useEmployee();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    const updatedEmployees = employeesData.filter((emp) => emp.id !== id);
    setEmployeesData(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  const filteredEmployees = employeesData.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "" || emp.department === filterDepartment;

    const matchesStatus = filterStatus === "" || emp.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">List Of Employees</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Departments</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="IT">IT</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>

          <Link to="/add-employee">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition">
              + Add Employee
            </button>
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center text-center 
                       hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={employee.image}
              alt={employee.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
            />

            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {employee.name}
            </h2>
            <p className="text-gray-500 text-sm">{employee.role}</p>

            <div className="mt-4 flex gap-3">
              <Link to={`/employees/${employee.id}`}>
                <button className="px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg shadow hover:bg-indigo-600 transition">
                  View
                </button>
              </Link>
              <button
                onClick={() => handleDelete(employee.id)}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;

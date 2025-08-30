import React, { useState } from "react";
import { useEmployee } from "../context/EmployeeContext";
import { useParams, useNavigate } from "react-router-dom";
import EditModal from "../components/EditModal";

const EmployeeDetails = () => {
  const { id } = useParams();
  const { employeesData } = useEmployee();
  const [editModal, setEditModal] = useState(false);
  const navigate = useNavigate();
  const employee = employeesData.find((emp) => emp.id === Number(id));

  if (!employee) {
    return (
      <div className="p-5 text-center text-red-500 font-semibold">
        Employee not found!
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-2xl bg-white">
      <div className="flex flex-col items-center gap-4">
        <img
          src={employee.image}
          alt={employee.name}
          className="w-32 h-32 object-cover rounded-full border-4 border-blue-400 shadow-md"
        />
        <h1 className="text-2xl font-bold text-gray-800">{employee.name}</h1>
        <p className="text-gray-500">{employee.role}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold">{employee.email}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Department</p>
          <p className="font-semibold">{employee.department}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Joining Date</p>
          <p className="font-semibold">{employee.joiningDate}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              employee.status === "Active"
                ? "bg-green-100 text-green-600"
                : employee.status === "Inactive"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {employee.status}
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        {" "}
        {/* changed to justify-between */}
        <button
          onClick={() => navigate("/employees")}
          className="px-5 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={() => setEditModal(true)}
          className="px-5 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
        >
          Edit
        </button>
        {editModal && (
          <EditModal employee={employee} setEditModal={setEditModal} />
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;

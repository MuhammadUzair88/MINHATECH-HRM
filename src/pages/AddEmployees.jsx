import React, { useState } from "react";
import { useEmployee } from "../context/EmployeeContext";
import { useNavigate } from "react-router-dom";

const AddEmployees = () => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    email: "",
    department: "",
    role: "",
    joiningDate: "",
    status: "Active",
    image: "",
  });

  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const { setEmployeesData, employeesData } = useEmployee();

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleForm = (e) => {
    e.preventDefault();

    if (!isEmailValid(formData.email)) {
      setEmailError("Invalid email address");
      return;
    }

    setEmailError("");

    const updatedEmployees = [...employeesData, formData];
    setEmployeesData(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    alert("Employee Added Successfully");

    setFormData({
      id: Date.now(),
      name: "",
      email: "",
      department: "",
      role: "",
      joiningDate: "",
      status: "Active",
      image: "",
    });
  };

  return (
    <div className="p-3 max-w-xl w-full shadow rounded-lg flex flex-col gap-4 mx-auto">
      <h1 className="text-2xl">
        <span className="font-bold text-blue-400">+</span> Add Employees
      </h1>

      <div>
        <label className="block text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter employee name"
          required
          minLength={3}
        />
      </div>

      <div>
        <label className="block text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 ${
            emailError
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-blue-500"
          }`}
          placeholder="Enter employee email"
          required
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>

      <div>
        <label className="block text-gray-600">Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="IT">IT</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-600">Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter employee role"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600">Joining Date</label>
        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={(e) =>
            setFormData({ ...formData, joiningDate: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-600">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-600">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
              };
              reader.readAsDataURL(file); // convert image to Base64
            }
          }}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/employees")}
          type="button"
          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleForm}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default AddEmployees;

import React, { useState } from "react";
import { useEmployee } from "../context/EmployeeContext";

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

  //now handle form submission
  const { setEmployeesData, employeesData } = useEmployee();

  const handleForm = (e) => {
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
        <span className=" font-bold text-blue-400">+</span> Add Employees
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
        />
      </div>

      <div>
        <label className="block text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter employee email"
        />
      </div>

      <div>
        <label className="block text-gray-600">Department</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter employee department"
        />
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
        />
      </div>

      <div>
        <label className="block text-gray-600">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-600">Profile Image (URL)</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
          placeholder="Paste image URL"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">
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

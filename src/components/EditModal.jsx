import React, { useState } from "react";
import { useEmployee } from "../context/EmployeeContext";

const EditModal = ({ employee, setEditModal }) => {
  const { setEmployeesData, employeesData } = useEmployee();

  // Pre-fill form with employee data
  const [formData, setFormData] = useState({ ...employee });

  const handleEditForm = (e) => {
    e.preventDefault();

    const newData = employeesData.map((emp) =>
      employee.id === emp.id ? { ...emp, ...formData } : emp
    );

    setEmployeesData(newData);
    localStorage.setItem("employees", JSON.stringify(newData));

    alert("Employee Edited Successfully ✅");
    setEditModal(false);
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-white bg-opacity-30 z-50">
      <div className="p-5 max-w-xl w-full bg-white shadow rounded-lg flex flex-col gap-4 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800">
          ✏️ Edit Employee
        </h1>

        {/* Name */}
        <div>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employee name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employee email"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-gray-600">Department</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employee department"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-gray-600">Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employee role"
          />
        </div>

        {/* Joining Date */}
        <div>
          <label className="block text-gray-600">Joining Date</label>
          <input
            type="date"
            value={formData.joiningDate}
            onChange={(e) =>
              setFormData({ ...formData, joiningDate: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-600">Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-600">Profile Image (URL)</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
            placeholder="Paste image URL"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setEditModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleEditForm}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

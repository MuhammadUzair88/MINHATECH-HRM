import React, { useState } from "react";
import { useEmployee } from "../context/EmployeeContext";

const EditModal = ({ employee, setEditModal }) => {
  const { setEmployeesData, employeesData } = useEmployee();
  const [formData, setFormData] = useState({ ...employee });
  const [emailValidation, setEmailValidation] = useState("");

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEditForm = (e) => {
    e.preventDefault();

    if (!isEmailValid(formData.email)) {
      setEmailValidation("Invalid email address");
      return;
    }

    const newData = employeesData.map((emp) =>
      emp.id === employee.id ? { ...emp, ...formData } : emp
    );

    setEmployeesData(newData);
    localStorage.setItem("employees", JSON.stringify(newData));

    alert("Employee Edited Successfully ✅");
    setEditModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-50 p-4">
      <div className="bg-white w-full max-w-lg md:max-w-xl lg:max-w-2xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          ✏️ Edit Employee
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleEditForm}>
          {/* Name */}
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter employee name"
              required
              minLength={3}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter employee email"
              required
            />
            <p>{emailValidation}</p>
          </div>

          <div className="flex flex-col md:flex-row md:gap-4">
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
            <div className="flex-1 mt-4 md:mt-0">
              <label className="block text-gray-600 mb-1">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter role"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="flex-1">
              <label className="block text-gray-600 mb-1">Joining Date</label>
              <input
                type="date"
                value={formData.joiningDate}
                onChange={(e) =>
                  setFormData({ ...formData, joiningDate: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label className="block text-gray-600 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
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
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setEditModal(false)}
              className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;

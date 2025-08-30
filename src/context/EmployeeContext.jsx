import { useState, useEffect, createContext, useContext } from "react";
import { employees as defaultEmployees } from "../assets/assets";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employeesData, setEmployeesData] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    if (storedEmployees && storedEmployees.length > 0) {
      setEmployeesData(storedEmployees);
    } else {
      localStorage.setItem("employees", JSON.stringify(defaultEmployees));
      setEmployeesData(defaultEmployees);
    }
  }, []);

  useEffect(() => {
    if (employeesData.length > 0) {
      localStorage.setItem("employees", JSON.stringify(employeesData));
    }
  }, [employeesData]);

  return (
    <EmployeeContext.Provider value={{ employeesData, setEmployeesData }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);

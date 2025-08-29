import { useState, useEffect, createContext, useContext } from "react";
import { employees as defaultEmployees } from "../assets/assets";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employeesData, setEmployeesData] = useState(defaultEmployees);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployeesData([...defaultEmployees, ...storedEmployees]);
  }, []);

  return (
    <EmployeeContext.Provider value={{ employeesData, setEmployeesData }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);

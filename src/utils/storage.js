const STORAGE_KEY = "employees";

export function getEmployees() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveEmployee(employee) {
  const employees = getEmployees();

  if (checkDuplicateEmployee(employee)) {
    alert(" A record with the same email or phone number already exists!");
    return false;
  }

  employee.id = Date.now();
  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  return true;
}

export function updateEmployee(updatedEmployee) {
  const employees = getEmployees();

  if (checkDuplicateEmployee(updatedEmployee, updatedEmployee.id)) {
    alert(
      " Another record with the same email or phone number already exists!"
    );
    return false;
  }

  const index = employees.findIndex((e) => e.id === updatedEmployee.id);
  if (index === -1) {
    alert("Employee not found!");
    return false;
  }

  employees[index] = updatedEmployee;
  localStorage.setItem("employees", JSON.stringify(employees));

  alert("Employee updated successfully!");
  return true;
}

export function deleteEmployee(id) {
  const employees = getEmployees().filter((emp) => emp.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  return employees;
}

export function checkDuplicateEmployee(employee, ignoreId = null) {
  const employees = getEmployees();

  return employees.some(
    (emp) =>
      emp.id !== ignoreId &&
      (emp.email.toLowerCase() === employee.email.toLowerCase() ||
        emp.phone.replace(/\s+/g, "") === employee.phone.replace(/\s+/g, ""))
  );
}

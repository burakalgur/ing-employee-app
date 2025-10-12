const STORAGE_KEY = "employees";

export function getEmployees() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveEmployee(newEmployee) {
  const employees = getEmployees();
  const id = Date.now(); // unique id
  employees.push({ id, ...newEmployee });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  return id;
}

export function updateEmployee(updatedEmployee) {
  const employees = getEmployees().map((emp) =>
    emp.id === updatedEmployee.id ? updatedEmployee : emp
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

export function deleteEmployee(id) {
  const employees = getEmployees().filter((emp) => emp.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

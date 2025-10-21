import {
  getEmployees,
  saveEmployee,
  updateEmployee,
  deleteEmployee,
  checkDuplicateEmployee,
} from "./storage.js";
import { vi } from "vitest";

describe("storage.js", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns empty array if no employees in localStorage", () => {
    expect(getEmployees()).toEqual([]);
  });

  it("returns parsed employees from localStorage", () => {
    const data = [{ id: 1, firstName: "Ali" }];
    localStorage.setItem("employees", JSON.stringify(data));
    expect(getEmployees()).toEqual(data);
  });

  it("saves a new employee successfully", () => {
    const emp = { email: "test@test.com", phone: "555 555 55 55" };
    const result = saveEmployee(emp);
    const saved = getEmployees();

    expect(result).toBe(true);
    expect(saved.length).toBe(1);
    expect(saved[0].email).toBe("test@test.com");
  });

  it("does not save duplicate employee (same email or phone)", () => {
    const e1 = { email: "a@b.com", phone: "555 555" };
    const e2 = { email: "A@B.com", phone: "999" };
    saveEmployee(e1);
    const result = saveEmployee(e2);

    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalled();
  });

  it("updates an existing employee successfully", () => {
    const emp = { id: 1, email: "a@b.com", phone: "555" };
    localStorage.setItem("employees", JSON.stringify([emp]));

    const updated = { id: 1, email: "a@b.com", phone: "999" };
    const result = updateEmployee(updated);

    expect(result).toBe(true);
    const stored = getEmployees();
    expect(stored[0].phone).toBe("999");
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("update")
    );
  });

  it("does not update if employee not found", () => {
    const result = updateEmployee({ id: 99, email: "x@x.com", phone: "111" });
    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalled();
  });

  it("does not update if duplicate found", () => {
    const employees = [
      { id: 1, email: "a@b.com", phone: "555" },
      { id: 2, email: "c@d.com", phone: "777" },
    ];
    localStorage.setItem("employees", JSON.stringify(employees));
    const updated = { id: 2, email: "a@b.com", phone: "777" };

    const result = updateEmployee(updated);
    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalled();
  });

  it("deletes an employee by id", () => {
    const employees = [
      { id: 1, email: "a@b.com", phone: "555" },
      { id: 2, email: "b@b.com", phone: "777" },
    ];
    localStorage.setItem("employees", JSON.stringify(employees));

    const remaining = deleteEmployee(1);
    expect(remaining.length).toBe(1);
    expect(remaining[0].id).toBe(2);
  });

  it("detects duplicate employees correctly", () => {
    const employees = [
      { id: 1, email: "a@b.com", phone: "555 555" },
      { id: 2, email: "b@b.com", phone: "555666" },
    ];
    localStorage.setItem("employees", JSON.stringify(employees));

    const duplicate = { id: 3, email: "A@B.com", phone: "555 555" };
    const unique = { id: 3, email: "c@c.com", phone: "888" };

    expect(checkDuplicateEmployee(duplicate)).toBe(true);
    expect(checkDuplicateEmployee(unique)).toBe(false);
  });
});

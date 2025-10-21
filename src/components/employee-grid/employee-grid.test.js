import { vi, describe, it, expect, beforeEach } from "vitest";
import { fixture, html } from "@open-wc/testing";
import { render } from "lit";
import "../../../src/components/employee-grid/employee-grid.js";
import * as storage from "../../../src/utils/storage.js";

vi.mock("@vaadin/grid", () => ({}));
vi.mock("@vaadin/grid/vaadin-grid-selection-column.js", () => ({}));

describe("<employee-grid>", () => {
  let el;
  const mockEmployees = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    firstName: `Name${i}`,
    lastName: `Last${i}`,
    dateOfEmployment: "2023-01-01",
    dateOfBirth: "1990-01-01",
    phone: "555 555 55 55",
    email: `user${i}@mail.com`,
    department: "Tech",
    position: "Mid",
  }));

  beforeEach(async () => {
    el = await fixture(html`<employee-grid></employee-grid>`);
    el.employees = [...mockEmployees];
    el.currentPage = 1;
    await el.updateComplete;
  });

  it("renders grid with correct number of items", async () => {
    const grid = el.renderRoot.querySelector("vaadin-grid");
    expect(grid).toBeTruthy();
    expect(el.paginatedEmployees.length).toBe(el.itemsPerPage);
  });

  it("shows delete modal with correct message", async () => {
    const spy = vi.spyOn(el.renderRoot.querySelector("#deleteModal"), "show");
    el.showDeleteModal(mockEmployees[0]);
    expect(spy).toHaveBeenCalled();
    expect(el.selectedEmployee).toEqual(mockEmployees[0]);
  });

  it("calls deleteEmployee and updates list on confirm", async () => {
    const deleteSpy = vi
      .spyOn(storage, "deleteEmployee")
      .mockReturnValue(mockEmployees.slice(1));
    const modalSpy = vi.spyOn(
      el.renderRoot.querySelector("#deleteModal"),
      "hide"
    );

    el.selectedEmployee = mockEmployees[0];
    el.handleConfirmDelete();

    expect(deleteSpy).toHaveBeenCalledWith(mockEmployees[0].id);
    expect(el.employees.length).toBe(mockEmployees.length - 1);
    expect(modalSpy).toHaveBeenCalled();
    expect(el.selectedEmployee).toBeNull();
  });

  it("does nothing if handleConfirmDelete called without selectedEmployee", () => {
    const deleteSpy = vi.spyOn(storage, "deleteEmployee");
    el.selectedEmployee = null;
    el.handleConfirmDelete();
    expect(deleteSpy).not.toHaveBeenCalled();
  });

  it("changes pages correctly with pagination buttons", async () => {
    const totalPages = el.totalPages;
    expect(totalPages).toBeGreaterThan(1);

    el.changePage(2);
    expect(el.currentPage).toBe(2);

    el.changePage(1);
    expect(el.currentPage).toBe(1);

    el.changePage(totalPages + 1);
    expect(el.currentPage).toBe(1);
  });

  it("renders pagination with ellipsis when totalPages > 7 and current <= 4", async () => {
    el.employees = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));
    el.currentPage = 3;
    await el.updateComplete;

    const wrapper = document.createElement("div");
    render(el.renderPagination(), wrapper);
    expect(wrapper.innerHTML.includes("...")).toBe(true);
  });

  it("renders pagination middle ellipsis when current is mid-range", async () => {
    el.employees = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));
    el.currentPage = 6;
    await el.updateComplete;

    const wrapper = document.createElement("div");
    render(el.renderPagination(), wrapper);
    expect(wrapper.innerHTML.includes("...")).toBe(true);
  });

  it("renders pagination end ellipsis when near last pages", async () => {
    el.employees = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));
    el.currentPage = 10;
    await el.updateComplete;

    const wrapper = document.createElement("div");
    render(el.renderPagination(), wrapper);
    expect(wrapper.innerHTML.includes("...")).toBe(true);
  });
});

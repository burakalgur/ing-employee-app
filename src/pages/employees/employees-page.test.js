import { describe, it, expect, vi, beforeEach } from "vitest";
import { fixture, html } from "@open-wc/testing";
import "./employees-page.js";
import * as storage from "../../../src/utils/storage.js";

vi.mock("../../../src/components/employee-grid/employee-grid.js", () => ({}));
vi.mock(
  "../../../src/components/employee-card-list/employee-card-list.js",
  () => ({})
);

describe("<employees-page>", () => {
  let el;
  const mockEmployees = [
    { id: 1, firstName: "Alice", lastName: "Smith" },
    { id: 2, firstName: "Bob", lastName: "Jones" },
  ];

  beforeEach(async () => {
    vi.spyOn(storage, "getEmployees").mockReturnValue(mockEmployees);
    el = await fixture(html`<employees-page></employees-page>`);
  });

  it("renders default view as list", () => {
    const listBtn = el.renderRoot.querySelector(".icon-btn.active");
    expect(listBtn).not.toBeNull();
    expect(el.view).toBe("list");
  });

  it("loads employees on connectedCallback", () => {
    expect(storage.getEmployees).toHaveBeenCalled();
    expect(el.employees).toEqual(mockEmployees);
  });

  it("changes view to grid when button clicked", async () => {
    const gridBtn = el.renderRoot.querySelectorAll(".icon-btn")[1];
    gridBtn.click();
    await el.updateComplete;
    expect(el.view).toBe("grid");
  });
});

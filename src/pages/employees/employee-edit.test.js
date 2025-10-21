import { describe, it, expect, vi, beforeEach } from "vitest";
import { fixture, html } from "@open-wc/testing";
import "./employee-edit.js";
import * as storage from "../../../src/utils/storage.js";

vi.mock("../../../src/components/employee-form/employee-form.js", () => ({}));
vi.mock("../../../src/utils/localization.js", () => ({
  t: (key) => key,
}));

if (!customElements.get("confirm-modal")) {
  class MockConfirmModal extends HTMLElement {
    show = vi.fn();
    hide = vi.fn();
  }
  customElements.define("confirm-modal", MockConfirmModal);
}

describe("<employee-edit>", () => {
  let el;
  const mockEmployees = [
    { id: 1, firstName: "Alice", lastName: "Smith" },
    { id: 2, firstName: "Bob", lastName: "Jones" },
  ];

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.spyOn(storage, "getEmployees").mockReturnValue(mockEmployees);
    vi.spyOn(storage, "updateEmployee").mockReturnValue(true);

    Object.defineProperty(window, "location", {
      value: { pathname: "/employees/edit/1", href: "", assign: vi.fn() },
      writable: true,
    });

    el = await fixture(html`<employee-edit></employee-edit>`);

    const modal = document.createElement("confirm-modal");
    modal.id = "editModal";
    modal.show = vi.fn();
    modal.hide = vi.fn();
    el.renderRoot.appendChild(modal);
  });

  it("loads employee based on URL id", () => {
    expect(storage.getEmployees).toHaveBeenCalled();
    expect(el.employee).toEqual(mockEmployees[0]);
  });

  it("renders not found message when employee not exists", async () => {
    vi.spyOn(storage, "getEmployees").mockReturnValue([]);
    const el2 = await fixture(html`<employee-edit></employee-edit>`);
    expect(el2.shadowRoot.textContent).toContain("not_found_error");
  });

  it("calls updateEmployee and redirects on confirm", async () => {
    const modal = el.renderRoot.querySelector("#editModal");
    modal.show = vi.fn();
    el.employee = mockEmployees[0];

    el.handleSave({ detail: { firstName: "Updated" } });

    const confirmEvent = new Event("confirm");
    modal.dispatchEvent(confirmEvent);

    expect(storage.updateEmployee).toHaveBeenCalledWith(
      expect.objectContaining({ firstName: "Updated" })
    );
  });

  it("calls history.back() on cancel", () => {
    const spy = vi.spyOn(window.history, "back");
    el.handleCancel();
    expect(spy).toHaveBeenCalled();
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { fixture, html } from "@open-wc/testing";
import "./employee-add.js";
import * as storage from "../../../src/utils/storage.js";

vi.mock("../../../src/components/employee-form/employee-form.js", () => ({}));
vi.mock("../../../src/components/confirm-modal/confirm-modal.js", () => {
  return {
    default: class MockConfirmModal extends HTMLElement {
      show = vi.fn();
      hide = vi.fn();
    },
  };
});

describe("<employee-add>", () => {
  let el;
  let modal;

  beforeEach(async () => {
    vi.restoreAllMocks();
    vi.spyOn(storage, "saveEmployee").mockReturnValue(true);
    vi.spyOn(storage, "checkDuplicateEmployee").mockReturnValue(false);

    modal = document.createElement("confirm-modal");
    modal.id = "infoModal";
    modal.show = vi.fn();
    modal.hide = vi.fn();

    el = await fixture(html`<employee-add></employee-add>`);
    el.renderRoot.appendChild(modal);
  });

  it("renders with form and modal", () => {
    const form = el.renderRoot.querySelector("employee-form");
    const confirm = el.renderRoot.querySelector("#infoModal");

    expect(form).not.toBeNull();
    expect(confirm).not.toBeNull();
  });

  it("calls history.back() on cancel", () => {
    const spy = vi.spyOn(window.history, "back");
    el.handleCancel();
    expect(spy).toHaveBeenCalled();
  });

  it("opens modal when handleSave is called", () => {
    const event = new CustomEvent("save", {
      detail: { firstName: "Alice", lastName: "Smith" },
    });

    el.renderRoot.querySelector = vi.fn().mockReturnValue(modal);
    el.handleSave(event);

    expect(modal.show).toHaveBeenCalledWith(
      expect.stringContaining("New employee will be created")
    );
  });

  it("calls saveEmployee on confirm event", async () => {
    el.pendingEmployee = { firstName: "Alice", lastName: "Smith" };

    el.renderRoot.querySelector = vi.fn().mockReturnValue(modal);
    el.handleSave({ detail: el.pendingEmployee });

    const confirmEvent = new Event("confirm");
    modal.dispatchEvent(confirmEvent);

    expect(storage.saveEmployee).toHaveBeenCalledWith(el.pendingEmployee);
  });

  it("does not save if saveEmployee returns false", async () => {
    storage.saveEmployee.mockReturnValue(false);
    el.pendingEmployee = { firstName: "Alice" };

    el.renderRoot.querySelector = vi.fn().mockReturnValue(modal);
    el.handleSave({ detail: el.pendingEmployee });

    modal.dispatchEvent(new Event("confirm"));
    expect(storage.saveEmployee).toHaveBeenCalled();
  });
});

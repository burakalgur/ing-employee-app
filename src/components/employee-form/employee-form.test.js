import { fixture, html } from "@open-wc/testing";
import "./employee-form.js";

describe("<employee-form>", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all main input fields", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const root = el.shadowRoot;

    const inputs = root.querySelectorAll("input");
    const selects = root.querySelectorAll("select");

    expect(inputs.length + selects.length).toBe(8);
  });

  it("shows editing info when in editing mode", async () => {
    const el = await fixture(
      html`<employee-form
        .editing=${true}
        .editingName=${"John Doe"}
      ></employee-form>`
    );
    const info = el.shadowRoot.querySelector(".editing-info");
    expect(info.textContent).toContain("John Doe");
  });

  it("updates field values when typing", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const root = el.shadowRoot;
    const firstNameInput = root.querySelector('input[name="firstName"]');
    firstNameInput.value = "Ali";
    firstNameInput.dispatchEvent(new Event("input"));

    expect(el.employee.firstName).toBe("Ali");
  });

  it("formats phone number correctly when typing", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const phoneInput = el.shadowRoot.querySelector("#phone");

    phoneInput.value = "+(90) 5556667788";
    phoneInput.dispatchEvent(new Event("input"));

    expect(el.employee.phone).toBe("+(90) 555 666 77 88");
  });

  it("dispatches cancel event when cancel button clicked", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const cancelBtn = el.shadowRoot.querySelector(".cancel");

    const spy = vi.fn();
    el.addEventListener("cancel", spy);

    cancelBtn.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("does not dispatch save event if validation fails", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    const saveBtn = el.shadowRoot.querySelector(".save");
    const spy = vi.fn();
    el.addEventListener("save", spy);

    saveBtn.click();

    expect(spy).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  it("dispatches save event if validation passes", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);

    // formu geçerli hale getir
    el.employee = {
      firstName: "Ali",
      lastName: "Yılmaz",
      dateOfEmployment: "2023-01-01",
      dateOfBirth: "1995-05-10",
      phone: "+(90) 555 666 77 88",
      email: "ali@test.com",
      department: "Tech",
      position: "Mid",
    };
    await el.updateComplete;

    const spy = vi.fn();
    el.addEventListener("save", spy);
    el.shadowRoot.querySelector(".save").click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail.firstName).toBe("Ali");
  });

  it("validateForm returns false when phone format invalid", async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    el.employee = {
      firstName: "Ahmet",
      lastName: "Yılmaz",
      dateOfEmployment: "2023-01-01",
      dateOfBirth: "1995-01-01",
      phone: "12345",
      email: "ahmet@test.com",
      department: "Tech",
      position: "Mid",
    };

    const valid = el.validateForm();
    expect(valid).toBe(false);
  });
});

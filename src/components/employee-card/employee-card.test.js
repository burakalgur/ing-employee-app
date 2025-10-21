import { fixture, html } from "@open-wc/testing";
import "./employee-card.js";

describe("<employee-card>", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  const mockEmployee = {
    id: 1,
    firstName: "Ali",
    lastName: "Yılmaz",
    dateOfEmployment: "2023-01-01",
    dateOfBirth: "1995-05-10",
    phone: "+(90) 555 666 77 88",
    email: "ali@example.com",
    department: "Tech",
    position: "Mid",
  };

  it("renders employee details correctly", async () => {
    const el = await fixture(
      html`<employee-card .employee=${mockEmployee}></employee-card>`
    );
    const root = el.shadowRoot;
    const fields = root.querySelectorAll(".field span");

    expect(fields[0].textContent).toBe("Ali");
    expect(fields[1].textContent).toBe("Yılmaz");
    expect(fields[2].textContent).toBe("2023-01-01");
    expect(fields[3].textContent).toBe("1995-05-10");
    expect(fields[4].textContent).toBe("+(90) 555 666 77 88");
    expect(fields[5].textContent).toBe("ali@example.com");
    expect(fields[6].textContent).toBe("Tech");
    expect(fields[7].textContent).toBe("Mid");
  });

  it("renders '-' for missing fields", async () => {
    const el = await fixture(
      html`<employee-card .employee=${{}}></employee-card>`
    );
    const root = el.shadowRoot;
    const spans = root.querySelectorAll(".field span");
    spans.forEach((s) => expect(s.textContent).toBe("-"));
  });

  it("dispatches edit event with correct id when edit button clicked", async () => {
    const el = await fixture(
      html`<employee-card .employee=${mockEmployee}></employee-card>`
    );
    const editBtn = el.shadowRoot.querySelector(".edit");
    const spy = vi.fn();
    el.addEventListener("edit", spy);

    editBtn.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe(mockEmployee.id);
  });

  it("dispatches delete event with correct id when delete button clicked", async () => {
    const el = await fixture(
      html`<employee-card .employee=${mockEmployee}></employee-card>`
    );
    const deleteBtn = el.shadowRoot.querySelector(".delete");
    const spy = vi.fn();
    el.addEventListener("delete", spy);

    deleteBtn.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe(mockEmployee.id);
  });
});

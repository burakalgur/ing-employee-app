import { fixture, html } from "@open-wc/testing";
import "./employee-card-list.js";

vi.mock("../../utils/storage.js", () => ({
  deleteEmployee: vi.fn(),
}));

import { deleteEmployee } from "../../utils/storage.js";

describe("<employee-card-list>", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  const mockEmployees = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    firstName: `Name${i + 1}`,
    lastName: `Surname${i + 1}`,
  }));

  it("renders paginated employees correctly", async () => {
    const el = await fixture(
      html`<employee-card-list
        .employees=${mockEmployees}
      ></employee-card-list>`
    );

    const cards = el.shadowRoot.querySelectorAll("employee-card");
    expect(cards.length).toBe(4);
    expect(cards[0].employee.firstName).toBe("Name1");
  });

  it("calculates totalPages correctly", async () => {
    const el = await fixture(
      html`<employee-card-list
        .employees=${mockEmployees}
      ></employee-card-list>`
    );

    expect(el.totalPages).toBe(
      Math.ceil(mockEmployees.length / el.itemsPerPage)
    );
  });

  it("changes page when changePage() is called", async () => {
    const el = await fixture(
      html`<employee-card-list
        .employees=${mockEmployees}
      ></employee-card-list>`
    );

    el.changePage(2);
    await el.updateComplete;

    expect(el.currentPage).toBe(2);
    const firstVisible = el.paginatedEmployees[0];
    expect(firstVisible.firstName).toBe("Name5");
  });

  it("does not go out of range when invalid page requested", async () => {
    const el = await fixture(
      html`<employee-card-list
        .employees=${mockEmployees}
      ></employee-card-list>`
    );

    el.changePage(0);
    expect(el.currentPage).toBe(1);

    el.changePage(99);
    expect(el.currentPage).toBe(1);
  });

  it("renders pagination buttons", async () => {
    const el = await fixture(
      html`<employee-card-list
        .employees=${mockEmployees}
      ></employee-card-list>`
    );

    const pagination = el.shadowRoot.querySelector(".pagination");
    expect(pagination).toBeTruthy();

    const pageButtons = pagination.querySelectorAll(".page-btn");
    expect(pageButtons.length).toBeGreaterThan(0);
  });

  it("calls showDeleteModal when employee-card emits delete", async () => {
    const el = await fixture(
      html`<employee-card-list
        .employees=${mockEmployees}
      ></employee-card-list>`
    );

    const spy = vi.spyOn(el, "showDeleteModal");
    const firstCard = el.shadowRoot.querySelector("employee-card");
    firstCard.dispatchEvent(new CustomEvent("delete"));

    expect(spy).toHaveBeenCalled();
  });

  it("showDeleteModal sets selectedEmployee and calls modal.show()", async () => {
    const el = await fixture(
      html`<employee-card-list
        .employees=${mockEmployees}
      ></employee-card-list>`
    );
    const modal = el.shadowRoot.querySelector("#deleteModal");
    modal.show = vi.fn();

    el.showDeleteModal(mockEmployees[0]);
    expect(el.selectedEmployee).toEqual(mockEmployees[0]);
    expect(modal.show).toHaveBeenCalledTimes(1);
  });

  it("handleConfirmDelete calls deleteEmployee and dispatches event", async () => {
    const el = await fixture(
      html`<employee-card-list
        .employees=${mockEmployees}
      ></employee-card-list>`
    );
    const modal = el.shadowRoot.querySelector("#deleteModal");
    modal.hide = vi.fn();

    el.selectedEmployee = mockEmployees[1];

    const spy = vi.fn();
    el.addEventListener("employee-deleted", spy);

    el.handleConfirmDelete();

    expect(deleteEmployee).toHaveBeenCalledWith(mockEmployees[1].id);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(el.selectedEmployee).toBeNull();
    expect(modal.hide).toHaveBeenCalled();
  });

  it("does nothing if handleConfirmDelete called with no selectedEmployee", async () => {
    const el = await fixture(html`<employee-card-list></employee-card-list>`);
    el.selectedEmployee = null;

    el.handleConfirmDelete();

    expect(deleteEmployee).not.toHaveBeenCalled();
  });
});

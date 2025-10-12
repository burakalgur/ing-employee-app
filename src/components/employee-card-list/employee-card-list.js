import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./employee-card-list.css?inline";
import leftArrow from "../../assets/icons/left.svg?raw";
import rightArrow from "../../assets/icons/right.svg?raw";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { deleteEmployee } from "../../utils/storage.js";
import "../employee-card/employee-card.js";
import "../confirm-modal/confirm-modal.js";

class EmployeeCardList extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    employees: { type: Array },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
  };

  constructor() {
    super();
    this.employees = [];
    this.currentPage = 1;
    this.itemsPerPage = 4;
  }

  get totalPages() {
    return Math.ceil(this.employees.length / this.itemsPerPage);
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.employees.slice(start, end);
  }

  changePage(page) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  showDeleteModal(employee) {
    this.selectedEmployee = employee;
    const modal = this.renderRoot.querySelector("#deleteModal");
    modal.show(`Delete record for ${employee.firstName} ${employee.lastName}?`);
  }

  handleConfirmDelete() {
    if (!this.selectedEmployee) return;
    deleteEmployee(this.selectedEmployee.id);
    this.dispatchEvent(new CustomEvent("employee-deleted"));
    this.selectedEmployee = null;
    this.renderRoot.querySelector("#deleteModal").hide();
  }

  renderPagination() {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages = [];

    pages.push(1);

    if (total <= 7) {
      for (let i = 2; i <= total; i++) pages.push(i);
    } else {
      if (current <= 4) {
        for (let i = 2; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(total);
      } else if (current > 4 && current < total - 3) {
        pages.push("...");
        pages.push(current - 1);
        pages.push(current);
        pages.push(current + 1);
        pages.push("...");
        pages.push(total);
      } else {
        pages.push("...");
        for (let i = total - 4; i <= total; i++) pages.push(i);
      }
    }

    return html`
      <div class="pagination">
        <button
          class="nav-btn left ${current === 1 ? "disabled" : ""}"
          ?disabled=${current === 1}
          @click=${() => this.changePage(current - 1)}
        >
          ${unsafeSVG(leftArrow)}
        </button>

        ${pages.map((p) =>
          p === "..."
            ? html`<span class="ellipsis">...</span>`
            : html`
                <button
                  class="page-btn ${current === p ? "active" : ""}"
                  @click=${() => this.changePage(p)}
                >
                  ${p}
                </button>
              `
        )}

        <button
          class="nav-btn right ${current === total ? "disabled" : ""}"
          ?disabled=${current === total}
          @click=${() => this.changePage(current + 1)}
        >
          ${unsafeSVG(rightArrow)}
        </button>
      </div>
    `;
  }

  render() {
    return html`
      <div class="card-grid">
        ${this.paginatedEmployees.map(
          (emp) => html` <employee-card
            .employee=${emp}
            @edit=${() => (window.location.href = `/employees/edit/${emp.id}`)}
            @delete=${() => this.showDeleteModal(emp)}
          ></employee-card>`
        )}
      </div>
      ${this.renderPagination()}
      <confirm-modal
        id="deleteModal"
        @confirm=${this.handleConfirmDelete}
      ></confirm-modal>
    `;
  }
}

customElements.define("employee-card-list", EmployeeCardList);

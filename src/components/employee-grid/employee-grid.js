import "@vaadin/grid";
import "@vaadin/grid/vaadin-grid-selection-column.js";
import { LitElement, html, css, unsafeCSS } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import gridStyles from "./employee-grid.css?inline";
import editIcon from "../../assets/icons/edit.svg?raw";
import trashIcon from "../../assets/icons/trash.svg?raw";
import leftArrow from "../../assets/icons/left.svg?raw";
import rightArrow from "../../assets/icons/right.svg?raw";

class EmployeeGrid extends LitElement {
  static styles = css`
    ${unsafeCSS(gridStyles)}
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
    this.itemsPerPage = 9;
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
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
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
      <vaadin-grid .items="${this.paginatedEmployees}">
        <vaadin-grid-selection-column
          auto-select
        ></vaadin-grid-selection-column>

        <vaadin-grid-column
          path="firstName"
          header="First Name"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="lastName"
          header="Last Name"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="dateOfEmployment"
          header="Date of Employment"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="dateOfBirth"
          header="Date of Birth"
        ></vaadin-grid-column>
        <vaadin-grid-column path="phone" header="Phone"></vaadin-grid-column>
        <vaadin-grid-column path="email" header="Email"></vaadin-grid-column>
        <vaadin-grid-column
          path="department"
          header="Department"
        ></vaadin-grid-column>
        <vaadin-grid-column
          path="position"
          header="Position"
        ></vaadin-grid-column>
        <vaadin-grid-column
          header="Actions"
          .renderer=${(root) => {
            root.innerHTML = `
              <div class="actions">
                <button class="icon-btn edit">${editIcon}</button>
                <button class="icon-btn delete">${trashIcon}</button>
              </div>
            `;
          }}
        ></vaadin-grid-column>
      </vaadin-grid>

      ${this.renderPagination()}
    `;
  }
}

customElements.define("employee-grid", EmployeeGrid);

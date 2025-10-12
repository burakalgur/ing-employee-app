import { LitElement, html, css, unsafeCSS } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import listIcon from "../../assets/icons/list.svg?raw";
import gridIcon from "../../assets/icons/grid.svg?raw";
import pageStyles from "./employees-page.css?inline";
import "../../components/employee-grid/employee-grid.js";
import { getEmployees } from "../../utils/storage.js";
import "../../components/employee-card-list/employee-card-list.js";

class EmployeesPage extends LitElement {
  static styles = css`
    ${unsafeCSS(pageStyles)}
  `;

  static properties = {
    view: { type: String },
    employees: { type: Array },
  };

  constructor() {
    super();
    this.view = "list";
    this.employees = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees = getEmployees();
  }

  changeView(view) {
    this.view = view;
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <h2>Employee List</h2>
          <div class="view-toggle">
            <button
              class="icon-btn ${this.view === "list" ? "active" : ""}"
              @click=${() => this.changeView("list")}
            >
              ${unsafeSVG(listIcon)}
            </button>
            <button
              class="icon-btn ${this.view === "grid" ? "active" : ""}"
              @click=${() => this.changeView("grid")}
            >
              ${unsafeSVG(gridIcon)}
            </button>
          </div>
        </div>

        ${this.view === "list"
          ? html`
              <employee-grid
                .employees=${this.employees}
                @employee-deleted=${this.loadEmployees}
              ></employee-grid>
            `
          : html`
              <employee-card-list
                .employees=${this.employees}
                @employee-deleted=${this.loadEmployees}
              ></employee-card-list>
            `}
      </div>
    `;
  }
}

customElements.define("employees-page", EmployeesPage);

import { LitElement, html, css, unsafeCSS } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import listIcon from "../../assets/icons/list.svg?raw";
import gridIcon from "../../assets/icons/grid.svg?raw";
import pageStyles from "./employees-page.css?inline";
import "../../components/employee-grid/employee-grid.js";

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
    this.employees = [
      {
        firstName: "Ahmet",
        lastName: "Sourtimes",
        dateOfEmployment: "23/09/2022",
        dateOfBirth: "23/09/1992",
        phone: "+(90) 532 123 45 67",
        email: "ahmet@sourtimes.org",
        department: "Analytics",
        position: "Junior",
      },
    ];
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

        <!-- ayrı component -->
        <employee-grid .employees=${this.employees}></employee-grid>
      </div>
    `;
  }
}

customElements.define("employees-page", EmployeesPage);

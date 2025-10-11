import { LitElement, html, css, unsafeCSS } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import listIcon from "../../assets/icons/list.svg?raw";
import gridIcon from "../../assets/icons/grid.svg?raw";
import pageStyles from "./employees-page.css?inline";

class EmployeesPage extends LitElement {
  static styles = css`
    ${unsafeCSS(pageStyles)}
  `;

  static properties = {
    view: { type: String },
  };

  constructor() {
    super();
    this.view = "list";
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
              title="List view"
            >
              ${unsafeSVG(listIcon)}
            </button>
            <button
              class="icon-btn ${this.view === "grid" ? "active" : ""}"
              @click=${() => this.changeView("grid")}
              title="Grid view"
            >
              ${unsafeSVG(gridIcon)}
            </button>
          </div>
        </div>

        <!-- tablo/grid burada eklenecek -->
      </div>
    `;
  }
}

customElements.define("employees-page", EmployeesPage);

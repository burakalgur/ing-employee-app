import { LitElement, html, css, unsafeCSS } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import navBarStyles from "./nav-bar.css?inline";
import addIcon from "../../assets/icons/add.svg?raw";
import employeeIcon from "../../assets/icons/employee.svg?raw";

class NavBar extends LitElement {
  static styles = css`
    ${unsafeCSS(navBarStyles)}
  `;

  static properties = {
    _open: { type: Boolean },
  };

  constructor() {
    super();
    this._open = false;
  }

  toggleMenu() {
    this._open = !this._open;
  }

  render() {
    return html`
      <nav>
        <div class="brand">
          <img id="logo" src="/logo.png" alt="ING Logo" />
          <span>ING</span>
        </div>

        <div class="menu">
          <a href="/employees"
            ><span>${unsafeSVG(employeeIcon)}</span>Employees</a
          >
          <a href="/employees/new" class="add"
            ><span>${unsafeSVG(addIcon)}</span>Add New</a
          >

          <img src="/flags/tr.png" alt="TR" class="flag" />
        </div>
      </nav>
    `;
  }
}

customElements.define("nav-bar", NavBar);

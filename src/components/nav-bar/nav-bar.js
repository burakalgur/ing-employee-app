import { LitElement, html, css, unsafeCSS } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import navBarStyles from "./nav-bar.css?inline";
import addIcon from "../../assets/icons/add.svg?raw";
import employeeIcon from "../../assets/icons/employee.svg?raw";
import { t } from "../../utils/localization.js";

class NavBar extends LitElement {
  static styles = css`
    ${unsafeCSS(navBarStyles)}
  `;

  static properties = {
    _open: { type: Boolean },
    _lang: { type: String },
  };

  constructor() {
    super();
    this._open = false;
    this._lang = document.documentElement.lang || "en";
  }

  toggleMenu() {
    this._open = !this._open;
  }

  connectedCallback() {
    super.connectedCallback();
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      this._lang = savedLang;
      document.documentElement.lang = savedLang;
    }
  }

  firstUpdated() {
    this.updateActiveLink();
    window.addEventListener("popstate", () => this.updateActiveLink());
  }

  updateActiveLink() {
    const currentPath = window.location.pathname;
    const employeesLink = this.renderRoot.querySelector('a[href="/employees"]');
    const addLink = this.renderRoot.querySelector('a[href="/employees/new"]');

    employeesLink?.classList.remove("active");
    addLink?.classList.remove("active");

    if (
      currentPath === "/employees" ||
      currentPath.startsWith("/employees/edit")
    ) {
      employeesLink?.classList.add("active");
    } else if (currentPath === "/employees/new") {
      addLink?.classList.add("active");
    }
  }

  toggleLanguage() {
    this._lang = this._lang === "tr" ? "en" : "tr";
    document.documentElement.lang = this._lang;
    localStorage.setItem("lang", this._lang);
    location.reload();
  }

  render() {
    const isTurkish = this._lang === "tr";
    const flagSrc = isTurkish ? "/flags/en.png" : "/flags/tr.png";
    const flagAlt = isTurkish ? "EN" : "TR";

    return html`
      <nav>
        <div class="brand">
          <img id="logo" src="/logo.png" alt="ING Logo" />
          <span>ING</span>
        </div>

        <div class="menu">
          <a href="/employees">
            <span>${unsafeSVG(employeeIcon)}</span>
            ${t("employees")}
          </a>
          <a href="/employees/new" class="add">
            <span>${unsafeSVG(addIcon)}</span>
            ${t("add_new")}
          </a>

          <img
            src="${flagSrc}"
            alt="${flagAlt}"
            class="flag"
            @click=${this.toggleLanguage}
            style="cursor: pointer;"
          />
        </div>
      </nav>
    `;
  }
}

if (!customElements.get("nav-bar")) {
  customElements.define("nav-bar", NavBar);
}

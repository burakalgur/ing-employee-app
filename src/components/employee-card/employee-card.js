import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./employee-card.css?inline";
import editIcon from "../../assets/icons/edit.svg?raw";
import trashIcon from "../../assets/icons/trash.svg?raw";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { t } from "../../utils/localization.js";

class EmployeeCard extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    employee: { type: Object },
  };

  constructor() {
    super();
    this.employee = {};
  }

  handleEdit() {
    this.dispatchEvent(new CustomEvent("edit", { detail: this.employee.id }));
  }

  handleDelete() {
    this.dispatchEvent(new CustomEvent("delete", { detail: this.employee.id }));
  }

  render() {
    const e = this.employee;
    return html`
      <div class="card">
        <div class="content">
          <div class="row">
            <div class="field">
              <label>${t("first_name")}:</label>
              <span>${e.firstName || "-"}</span>
            </div>
            <div class="field">
              <label>${t("last_name")}:</label>
              <span>${e.lastName || "-"}</span>
            </div>
          </div>

          <div class="row">
            <div class="field">
              <label>${t("date_of_employment")}</label>
              <span>${e.dateOfEmployment || "-"}</span>
            </div>
            <div class="field">
              <label>${t("date_of_birth")}</label>
              <span>${e.dateOfBirth || "-"}</span>
            </div>
          </div>

          <div class="row">
            <div class="field">
              <label>${t("phone")}</label>
              <span>${e.phone || "-"}</span>
            </div>
            <div class="field">
              <label>${t("email")}</label>
              <span>${e.email || "-"}</span>
            </div>
          </div>

          <div class="row">
            <div class="field">
              <label>${t("department")}</label>
              <span>${e.department || "-"}</span>
            </div>
            <div class="field">
              <label>${t("position")}</label>
              <span>${e.position || "-"}</span>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="edit" @click=${this.handleEdit}>
            ${unsafeSVG(editIcon)} ${t("edit")}
          </button>
          <button class="delete" @click=${this.handleDelete}>
            ${unsafeSVG(trashIcon)} ${t("delete")}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("employee-card", EmployeeCard);

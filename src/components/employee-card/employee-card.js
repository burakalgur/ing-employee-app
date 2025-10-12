import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./employee-card.css?inline";
import editIcon from "../../assets/icons/edit.svg?raw";
import trashIcon from "../../assets/icons/trash.svg?raw";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

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
              <label>First Name:</label>
              <span>${e.firstName || "-"}</span>
            </div>
            <div class="field">
              <label>Last Name:</label>
              <span>${e.lastName || "-"}</span>
            </div>
          </div>

          <div class="row">
            <div class="field">
              <label>Date of Employment</label>
              <span>${e.dateOfEmployment || "-"}</span>
            </div>
            <div class="field">
              <label>Date of Birth</label>
              <span>${e.dateOfBirth || "-"}</span>
            </div>
          </div>

          <div class="row">
            <div class="field">
              <label>Phone</label>
              <span>${e.phone || "-"}</span>
            </div>
            <div class="field">
              <label>Email</label>
              <span>${e.email || "-"}</span>
            </div>
          </div>

          <div class="row">
            <div class="field">
              <label>Department</label>
              <span>${e.department || "-"}</span>
            </div>
            <div class="field">
              <label>Position</label>
              <span>${e.position || "-"}</span>
            </div>
          </div>
        </div>

        <div class="actions">
          <button class="edit" @click=${this.handleEdit}>
            ${unsafeSVG(editIcon)} Edit
          </button>
          <button class="delete" @click=${this.handleDelete}>
            ${unsafeSVG(trashIcon)} Delete
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("employee-card", EmployeeCard);

import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./employee-edit.css?inline";
import "../../components/employee-form/employee-form.js";
import { getEmployees, updateEmployee } from "../../utils/storage.js";
import "../../components/confirm-modal/confirm-modal.js";

class EmployeeEdit extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    employee: { type: Object },
  };

  constructor() {
    super();
    this.employee = null;
  }

  connectedCallback() {
    super.connectedCallback();
    const id = this._getIdFromUrl();
    const employees = getEmployees();
    this.employee = employees.find((emp) => emp.id == id);
  }

  _getIdFromUrl() {
    const parts = window.location.pathname.split("/");
    return parts[parts.length - 1];
  }

  handleSave(e) {
    this.pendingUpdate = { ...this.employee, ...e.detail };
    const modal = this.renderRoot.querySelector("#editModal");

    modal.show(
      `Selected Employee record of ${this.employee.firstName} ${this.employee.lastName} will be edited`
    );

    modal.addEventListener(
      "confirm",
      () => {
        const isUpdated = updateEmployee(this.pendingUpdate);
        if (!isUpdated) {
          return false;
        }
        modal.show("Employee updated successfully!");
        setTimeout(() => {
          window.location.href = "/employees";
        }, 1000);
      },
      { once: true }
    );
  }

  handleCancel() {
    window.history.back();
  }

  render() {
    if (!this.employee) {
      return html`<p>Employee not found.</p>`;
    }

    return html`
      <div class="container">
        <h2 class="header">Edit Employee</h2>
        <employee-form
          .employee=${this.employee}
          @save=${this.handleSave}
          @cancel=${this.handleCancel}
        ></employee-form>
      </div>
      <confirm-modal id="editModal"></confirm-modal>
    `;
  }
}

customElements.define("employee-edit", EmployeeEdit);

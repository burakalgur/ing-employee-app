import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./employee-edit.css?inline";
import "../../components/employee-form/employee-form.js";
import { getEmployees, updateEmployee } from "../../utils/storage.js";

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
    const updatedData = { ...this.employee, ...e.detail };
    updateEmployee(updatedData);
    alert("Employee updated successfully!");
    window.location.href = "/employees";
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
        <h2>Edit Employee</h2>
        <employee-form
          .employee=${this.employee}
          @save=${this.handleSave}
          @cancel=${this.handleCancel}
        ></employee-form>
      </div>
    `;
  }
}

customElements.define("employee-edit", EmployeeEdit);

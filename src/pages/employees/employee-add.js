import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./employee-add.css?inline";
import "../../components/employee-form/employee-form.js";
import { saveEmployee } from "../../utils/storage.js";

class EmployeeAdd extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  handleCancel() {
    window.history.back();
  }

  handleSave(e) {
    const employeeData = e.detail;
    saveEmployee(employeeData);
    alert("Employee added successfully!");
    window.location.href = "/employees";
  }

  render() {
    return html`
      <div class="container">
        <h2 class="header">Add Employee</h2>
        <employee-form
          @save=${this.handleSave}
          @cancel=${this.handleCancel}
        ></employee-form>
      </div>
    `;
  }
}

customElements.define("employee-add", EmployeeAdd);

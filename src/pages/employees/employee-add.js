import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./employee-add.css?inline";
import "../../components/employee-form/employee-form.js";
import { saveEmployee } from "../../utils/storage.js";
import "../../components/confirm-modal/confirm-modal.js";

class EmployeeAdd extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  constructor() {
    super();
    this.pendingEmployee = null;
  }

  handleCancel() {
    window.history.back();
  }

  handleSave(e) {
    this.pendingEmployee = e.detail;
    const modal = this.renderRoot.querySelector("#infoModal");

    modal.show("New employee will be created");

    modal.addEventListener(
      "confirm",
      () => {
        saveEmployee(this.pendingEmployee);
        modal.show("✅ Employee added successfully!");
        setTimeout(() => {
          window.location.href = "/employees";
        }, 100);
      },
      { once: true }
    );
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
      <confirm-modal id="infoModal"></confirm-modal>
    `;
  }
}

customElements.define("employee-add", EmployeeAdd);

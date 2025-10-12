import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./employee-add.css?inline";
import "../../components/employee-form/employee-form.js";
import { saveEmployee, checkDuplicateEmployee } from "../../utils/storage.js";
import "../../components/confirm-modal/confirm-modal.js";
import { t } from "../../utils/localization.js";

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

    modal.show(`${t("modal_create_info")}`);

    modal.addEventListener(
      "confirm",
      () => {
        const isSaved = saveEmployee(this.pendingEmployee);
        if (!isSaved) {
          return false;
        }
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
        <h2 class="header">${t("add_employee")}</h2>
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

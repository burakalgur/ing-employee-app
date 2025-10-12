import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./employee-form.css?inline";

class EmployeeForm extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    employee: { type: Object },
  };

  constructor() {
    super();
    this.employee = {
      firstName: "",
      lastName: "",
      dateOfEmployment: "",
      dateOfBirth: "",
      phone: "",
      email: "",
      department: "",
      position: "",
    };
  }

  updateField(e) {
    const { name, value } = e.target;
    this.employee = { ...this.employee, [name]: value };
  }

  submitForm() {
    this.dispatchEvent(new CustomEvent("save", { detail: this.employee }));
  }

  cancelForm() {
    this.dispatchEvent(new CustomEvent("cancel"));
  }

  render() {
    const e = this.employee;
    return html`
      <form>
        <div class="grid">
          <label>
            <span>First Name</span>
            <input
              name="firstName"
              .value=${e.firstName}
              @input=${this.updateField}
            />
          </label>

          <label>
            <span>Last Name</span>
            <input
              name="lastName"
              .value=${e.lastName}
              @input=${this.updateField}
            />
          </label>

          <label>
            <span>Date of Employment</span>
            <input
              type="date"
              name="dateOfEmployment"
              .value=${e.dateOfEmployment}
              @input=${this.updateField}
            />
          </label>

          <label>
            <span>Date of Birth</span>
            <input
              type="date"
              name="dateOfBirth"
              .value=${e.dateOfBirth}
              @input=${this.updateField}
            />
          </label>

          <label>
            <span>Phone</span>
            <input name="phone" .value=${e.phone} @input=${this.updateField} />
          </label>

          <label>
            <span>Email</span>
            <input name="email" .value=${e.email} @input=${this.updateField} />
          </label>

          <label>
            <span>Department</span>
            <input
              name="department"
              .value=${e.department}
              @input=${this.updateField}
            />
          </label>

          <label>
            <span>Position</span>
            <select
              name="position"
              .value=${e.position}
              @change=${this.updateField}
            >
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </label>
        </div>

        <div class="actions">
          <button type="button" class="save" @click=${this.submitForm}>
            Save
          </button>
          <button type="button" class="cancel" @click=${this.cancelForm}>
            Cancel
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define("employee-form", EmployeeForm);

import { LitElement, html, css, unsafeCSS } from "lit";
import styles from "./employee-form.css?inline";
import { t } from "../../utils/localization.js";

class EmployeeForm extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    employee: { type: Object },
    editing: { type: Boolean },
    editingName: { type: String },
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

    if (name === "phone") {
      const digits = value.replace(/\D/g, "");
      const number = digits.substring(2);
      const formatted =
        "+(90) " +
        number
          .replace(/^(\d{3})(\d{3})(\d{2})(\d{2}).*/, "5$1 $2 $3 $4")
          .trim();

      this.employee = { ...this.employee, phone: formatted };
      this.requestUpdate();
      return;
    }

    this.employee = { ...this.employee, [name]: value };
  }

  submitForm() {
    if (!this.validateForm()) return;
    this.dispatchEvent(new CustomEvent("save", { detail: this.employee }));
  }

  cancelForm() {
    this.dispatchEvent(new CustomEvent("cancel"));
  }
  validateForm() {
    const e = this.employee;
    const phoneRegex = /^\+\(90\)\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
    let valid = true;
    let errors = [];

    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfEmployment",
      "dateOfBirth",
      "phone",
      "email",
      "department",
      "position",
    ];

    requiredFields.forEach((field) => {
      if (!e[field] || e[field].trim() === "") {
        errors.push(`${field} ${t("input_require_error")}`);
        valid = false;
      }
    });

    if (e.firstName && (e.firstName.length < 2 || e.firstName.length > 30)) {
      errors.push(`${t("firstname_length_error")}`);
      valid = false;
    }

    if (e.lastName && (e.lastName.length < 2 || e.lastName.length > 30)) {
      errors.push(`${t("lastname_length_error")}`);
      valid = false;
    }

    if (e.phone && !phoneRegex.test(e.phone)) {
      errors.push(`${t("phone_format_error")}`);
      valid = false;
    }

    if (!valid) {
      alert(`${t("validation_error")}\n\n` + errors[0]);
    }

    return valid;
  }
  formatPhone(e) {
    let value = e.target.value;

    if (!value.startsWith("+(90)")) {
      value = "+(90) ";
    }

    let digits = value.replace(/[^\d]/g, "").replace(/^90/, "");
    digits = digits.substring(0, 10);

    let formatted = "+(90)";
    if (digits.length > 0) formatted += " " + digits.substring(0, 3);
    if (digits.length >= 4) formatted += " " + digits.substring(3, 6);
    if (digits.length >= 7) formatted += " " + digits.substring(6, 8);
    if (digits.length >= 9) formatted += " " + digits.substring(8, 10);

    e.target.value = formatted;
    this.employee = { ...this.employee, phone: formatted };
  }

  render() {
    const e = this.employee;
    return html`
      <div class="form-container">
        ${this.editing
          ? html`<p class="editing-info">
              ${t("edit_title")} ${this.editingName}
            </p>`
          : ""}
        <form>
          <div class="grid">
            <label>
              <span>${t("first_name")}</span>
              <input
                name="firstName"
                .value=${e.firstName}
                @input=${this.updateField}
              />
            </label>

            <label>
              <span>${t("last_name")}</span>
              <input
                name="lastName"
                .value=${e.lastName}
                @input=${this.updateField}
              />
            </label>

            <label>
              <span>${t("date_of_employment")}</span>
              <input
                type="date"
                name="dateOfEmployment"
                .value=${e.dateOfEmployment}
                @input=${this.updateField}
              />
            </label>

            <label>
              <span>${t("date_of_birth")}</span>
              <input
                type="date"
                name="dateOfBirth"
                .value=${e.dateOfBirth}
                @input=${this.updateField}
                max=${new Date().toISOString().split("T")[0]}
              />
            </label>

            <label>
              <span>${t("phone")}</span>
              <input
                id="phone"
                name="phone"
                maxlength="19"
                @input=${this.formatPhone}
                .value=${this.employee.phone || "+(90) "}
              />
            </label>

            <label>
              <span>${t("email")}</span>
              <input
                name="email"
                .value=${e.email}
                @input=${this.updateField}
              />
            </label>

            <label>
              <span>${t("department")}</span>
              <select
                name="department"
                .value=${e.department}
                @change=${this.updateField}
              >
                <option>Analytics</option>
                <option>Tech</option>
              </select>
            </label>

            <label>
              <span>${t("position")}</span>
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
              ${t("save")}
            </button>
            <button type="button" class="cancel" @click=${this.cancelForm}>
              ${t("cancel")}
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

customElements.define("employee-form", EmployeeForm);

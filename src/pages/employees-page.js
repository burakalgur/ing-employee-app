import { LitElement, html, css } from "lit";

class EmployeesPage extends LitElement {
  static styles = css`
    @import url("../styles.css");
  `;
  render() {
    return html`
      <div class="container">
        <div class="card">
          <h2>Employees Page</h2>
          <p>Global stiller başarıyla yüklendi 🎨</p>
          <button class="btn">Add Employee</button>
        </div>
      </div>
    `;
  }
}
customElements.define("employees-page", EmployeesPage);

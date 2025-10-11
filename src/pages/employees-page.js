import { LitElement, html, css } from "lit";

class EmployeesPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
    }
  `;
  render() {
    return html`
      <h2>Employees Page</h2>
      <p>Bu sayfa router üzerinden yüklendi 🎯</p>
    `;
  }
}
customElements.define("employees-page", EmployeesPage);

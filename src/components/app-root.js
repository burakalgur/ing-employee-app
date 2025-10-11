import "./nav-bar/nav-bar.js";
import { LitElement, html, css } from "lit";
import { initRouter } from "../router.js";

class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;
  firstUpdated() {
    const outlet = this.renderRoot.getElementById("outlet");
    initRouter(outlet);
  }
  render() {
    return html`
      <nav-bar></nav-bar>
      <main id="outlet"></main>
    `;
  }
}
customElements.define("app-root", AppRoot);

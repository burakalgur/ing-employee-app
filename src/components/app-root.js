import { LitElement, html, css } from "lit";
import { initRouter } from "../router.js";

class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    }
    header {
      padding: 16px;
      border-bottom: 1px solid #eee;
      font-weight: 800;
    }
    main {
      padding: 16px;
    }
  `;

  firstUpdated() {
    const outlet = this.renderRoot.getElementById("outlet");
    initRouter(outlet);
  }

  render() {
    return html`
      <header>hello</header>
      <main id="outlet"></main>
    `;
  }
}

customElements.define("app-root", AppRoot);

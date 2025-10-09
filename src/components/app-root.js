import { LitElement, html, css } from "lit";

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
    .badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 999px;
      background: #ff6a00;
      color: #fff;
      font-size: 12px;
    }
  `;
  render() {
    return html` <header>hello</header> `;
  }
}

customElements.define("app-root", AppRoot);

import { LitElement, html, unsafeCSS } from "lit";
import crossIcon from "../../assets/icons/cross.svg?raw"; // sağ üst kapatma ikonu
import styles from "./confirm-modal.css?inline";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

class ConfirmModal extends LitElement {
  static styles = [unsafeCSS(styles)];

  static properties = {
    message: { type: String },
    open: { type: Boolean },
    title: { type: String },
  };

  constructor() {
    super();
    this.message = "";
    this.open = false;
    this.title = "Are you sure?";
  }

  show(msg, title = "Are you sure?") {
    this.message = msg;
    this.title = title;
    this.open = true;
  }

  hide() {
    this.open = false;
  }

  confirm() {
    this.dispatchEvent(new CustomEvent("confirm"));
    this.hide();
  }

  cancel() {
    this.dispatchEvent(new CustomEvent("cancel"));
    this.hide();
  }

  render() {
    return html`
      ${this.open
        ? html`
            <div class="overlay" @click=${this.cancel}></div>
            <div class="modal">
              <div class="header">
                <h3>${this.title}</h3>
                <button class="close-btn" @click=${this.cancel}>
                  ${unsafeSVG(crossIcon)}
                </button>
              </div>
              <div class="message">${this.message}</div>
              <div class="actions">
                <button class="confirm" @click=${this.confirm}>Proceed</button>
                <button class="cancel" @click=${this.cancel}>Cancel</button>
              </div>
            </div>
          `
        : ""}
    `;
  }
}

customElements.define("confirm-modal", ConfirmModal);

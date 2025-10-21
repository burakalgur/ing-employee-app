import { fixture, html } from "@open-wc/testing";
import "./confirm-modal.js";

describe("<confirm-modal>", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("starts closed by default", async () => {
    const el = await fixture(html`<confirm-modal></confirm-modal>`);
    expect(el.open).toBe(false);
    const overlay = el.shadowRoot.querySelector(".overlay");
    expect(overlay).toBeNull();
  });

  it("opens and displays title + message when show() is called", async () => {
    const el = await fixture(html`<confirm-modal></confirm-modal>`);
    el.show("Are you sure?", "Confirm Delete");
    await el.updateComplete;

    expect(el.open).toBe(true);

    const title = el.shadowRoot.querySelector("h3");
    const message = el.shadowRoot.querySelector(".message");

    expect(title.textContent).toBe("Confirm Delete");
    expect(message.textContent).toBe("Are you sure?");
  });

  it("hides when hide() is called", async () => {
    const el = await fixture(html`<confirm-modal></confirm-modal>`);
    el.show("Temp message");
    await el.updateComplete;

    el.hide();
    await el.updateComplete;

    expect(el.open).toBe(false);
    const overlay = el.shadowRoot.querySelector(".overlay");
    expect(overlay).toBeNull();
  });

  it("dispatches confirm event and hides when confirm button clicked", async () => {
    const el = await fixture(html`<confirm-modal></confirm-modal>`);
    el.show("Proceed?");
    await el.updateComplete;

    const confirmBtn = el.shadowRoot.querySelector(".confirm");
    const spy = vi.fn();
    el.addEventListener("confirm", spy);

    confirmBtn.click();
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);
    expect(el.open).toBe(false);
  });

  it("dispatches cancel event and hides when cancel button clicked", async () => {
    const el = await fixture(html`<confirm-modal></confirm-modal>`);
    el.show("Cancel?");
    await el.updateComplete;

    const cancelBtn = el.shadowRoot.querySelector(".cancel");
    const spy = vi.fn();
    el.addEventListener("cancel", spy);

    cancelBtn.click();
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);
    expect(el.open).toBe(false);
  });

  it("dispatches cancel event when overlay is clicked", async () => {
    const el = await fixture(html`<confirm-modal></confirm-modal>`);
    el.show("Overlay cancel?");
    await el.updateComplete;

    const overlay = el.shadowRoot.querySelector(".overlay");
    const spy = vi.fn();
    el.addEventListener("cancel", spy);

    overlay.click();
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);
    expect(el.open).toBe(false);
  });

  it("dispatches cancel event when close button is clicked", async () => {
    const el = await fixture(html`<confirm-modal></confirm-modal>`);
    el.show("Close test");
    await el.updateComplete;

    const closeBtn = el.shadowRoot.querySelector(".close-btn");
    const spy = vi.fn();
    el.addEventListener("cancel", spy);

    closeBtn.click();
    await el.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);
    expect(el.open).toBe(false);
  });
});

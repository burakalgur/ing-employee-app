import { describe, it, expect, vi, beforeEach } from "vitest";
import { fixture, html } from "@open-wc/testing";
import "./app-root.js";
import * as routerModule from "../router.js";

vi.mock("../router.js", () => ({
  initRouter: vi.fn(),
}));

describe("<app-root>", () => {
  let el;

  beforeEach(async () => {
    el = await fixture(html`<app-root></app-root>`);
  });

  it("renders nav-bar and outlet", () => {
    const nav = el.shadowRoot.querySelector("nav-bar");
    const outlet = el.shadowRoot.querySelector("#outlet");
    expect(nav).not.toBeNull();
    expect(outlet).not.toBeNull();
  });

  it("calls initRouter with the outlet element", () => {
    const outlet = el.shadowRoot.querySelector("#outlet");
    el.firstUpdated();
    expect(routerModule.initRouter).toHaveBeenCalledWith(outlet);
  });
});

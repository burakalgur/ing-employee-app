import { fixture, html } from "@open-wc/testing";
import "./nav-bar.js";

describe("<nav-bar>", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = "";
    window.history.pushState({}, "", "/");
  });

  it("renders logo and brand text", async () => {
    const el = await fixture(html`<nav-bar></nav-bar>`);
    const root = el.shadowRoot;

    const logo = root.querySelector("#logo");
    expect(logo).toBeTruthy();
    expect(logo.getAttribute("src")).toBe("/logo.png");

    const brand = root.querySelector(".brand span");
    expect(brand.textContent).toContain("ING");
  });

  it("renders menu links for employees and add new", async () => {
    const el = await fixture(html`<nav-bar></nav-bar>`);
    const root = el.shadowRoot;
    const links = root.querySelectorAll(".menu a");
    expect(links.length).toBe(2);
    expect(links[0].getAttribute("href")).toBe("/employees");
    expect(links[1].getAttribute("href")).toBe("/employees/new");
  });

  it("sets active link based on pathname", async () => {
    window.history.pushState({}, "", "/employees/new");
    const el = await fixture(html`<nav-bar></nav-bar>`);
    el.updateActiveLink();
    const root = el.shadowRoot;

    const addLink = root.querySelector('a[href="/employees/new"]');
    const employeesLink = root.querySelector('a[href="/employees"]');
    expect(addLink.classList.contains("active")).toBe(true);
    expect(employeesLink.classList.contains("active")).toBe(false);
  });

  it("loads saved language from localStorage on connectedCallback", async () => {
    localStorage.setItem("lang", "tr");
    const el = await fixture(html`<nav-bar></nav-bar>`);
    expect(el._lang).toBe("tr");
    expect(document.documentElement.lang).toBe("tr");
  });

  it("toggles language between en and tr", async () => {
    const el = await fixture(html`<nav-bar></nav-bar>`);
    el._lang = "en";
    const reloadSpy = vi.spyOn(location, "reload").mockImplementation(() => {});
    el.toggleLanguage();
    expect(el._lang).toBe("tr");
    expect(localStorage.getItem("lang")).toBe("tr");
    expect(document.documentElement.lang).toBe("tr");
    expect(reloadSpy).toHaveBeenCalled();
    reloadSpy.mockRestore();
  });

  it("renders correct flag for language", async () => {
    const el = await fixture(html`<nav-bar></nav-bar>`);
    const root = el.shadowRoot;
    const flag = root.querySelector(".flag");
    expect(flag.getAttribute("src")).toContain("/flags/en.png");
    el._lang = "tr";
    await el.requestUpdate();
    expect(root.querySelector(".flag").getAttribute("src")).toContain(
      "/flags/en.png"
    );
  });
});

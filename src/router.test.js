import { describe, it, expect, vi } from "vitest";
import { initRouter } from "./router.js";
import { Router } from "@vaadin/router";

vi.mock("@vaadin/router", () => {
  return {
    Router: vi.fn().mockImplementation(() => ({
      setRoutes: vi.fn(),
    })),
  };
});

describe("initRouter", () => {
  it("creates a Router instance and sets routes correctly", () => {
    const mockOutlet = document.createElement("div");
    const mockSetRoutes = vi.fn();

    Router.mockImplementation(() => ({
      setRoutes: mockSetRoutes,
    }));

    initRouter(mockOutlet);

    expect(Router).toHaveBeenCalledWith(mockOutlet);
    expect(mockSetRoutes).toHaveBeenCalled();

    const routesArg = mockSetRoutes.mock.calls[0][0];
    expect(routesArg).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "/", redirect: "/employees" }),
        expect.objectContaining({ path: "/employees" }),
        expect.objectContaining({ path: "/employees/new" }),
        expect.objectContaining({ path: "/employees/edit/:id" }),
      ])
    );
  });
});

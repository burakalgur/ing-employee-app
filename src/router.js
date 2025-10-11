import { Router } from "@vaadin/router";

export function initRouter(outlet) {
  const router = new Router(outlet);
  router.setRoutes([
    { path: "/", redirect: "/employees" },
    {
      path: "/employees",
      component: "employees-page",
      action: async () => {
        await import("./pages/employees-page.js");
      },
    },
  ]);
}

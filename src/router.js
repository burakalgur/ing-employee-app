import { Router } from "@vaadin/router";

export function initRouter(outlet) {
  const router = new Router(outlet);

  router.setRoutes([
    { path: "/", redirect: "/employees" },
    {
      path: "/employees",
      component: "employees-page",
      action: async () => {
        await import("./pages/employees/employees-page.js");
      },
    },
    {
      path: "/employees/new",
      component: "employee-add",
      action: async () => {
        await import("./pages/employees/employee-add.js");
      },
    },
  ]);
}

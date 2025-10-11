import { Router } from "@vaadin/router";

export function initRouter(outlet) {
  const router = new Router(outlet);

  router.setRoutes([
    { path: "/", redirect: "/employees" },
    {
      path: "/employees",
      component: "employees-page",
      action: async () => {
        // yeni dizin yapısına göre import yolu düzeltildi
        await import("./pages/employees/employees-page.js");
      },
    },
  ]);
}

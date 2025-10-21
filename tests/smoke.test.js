import { test, expect } from "vitest";

test("vitest environment works", () => {
  expect(1 + 1).toBe(2);
});

test("jsdom provides document", () => {
  const div = document.createElement("div");
  div.id = "root";
  document.body.appendChild(div);
  expect(document.getElementById("root")).not.toBeNull();
});

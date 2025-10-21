import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    deps: {
      inline: ["jsdom", "parse5"],
    },
    setupFiles: ["./tests/setup.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      all: true,
      include: ["src/**/*.js"],
      lines: 85,
      functions: 85,
      branches: 80,
      statements: 85,
    },
  },
});

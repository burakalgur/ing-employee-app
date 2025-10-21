import { describe, it, expect, vi, beforeEach } from "vitest";
import * as localization from "./localization.js";

vi.mock("../locales/index.js", () => ({
  default: {
    en: {
      greeting: "Hello {{name}}",
      nested: { message: "Welcome, {{user}}!" },
    },
    tr: {
      greeting: "Merhaba {{name}}",
      nested: { message: "Hoş geldin, {{user}}!" },
    },
  },
}));

describe("localization utility", () => {
  beforeEach(() => {
    document.documentElement.lang = "en";
  });

  it("returns interpolated string for English", () => {
    const result = localization.t("greeting", { name: "Burak" });
    expect(result).toBe("Hello Burak");
  });

  it("returns interpolated string for Turkish", () => {
    document.documentElement.lang = "tr";
    const result = localization.t("greeting", { name: "Burak" });
    expect(result).toBe("Merhaba Burak");
  });

  it("resolves nested keys correctly", () => {
    const result = localization.t("nested.message", { user: "Ali" });
    expect(result).toContain("Welcome, Ali");
  });

  it("returns key itself if translation missing", () => {
    const result = localization.t("non_existing_key");
    expect(result).toBe("non_existing_key");
  });

  it("handles missing params gracefully", () => {
    const result = localization.t("greeting");
    expect(result).toBe("Hello ");
  });

  it("fallbacks to English when lang is unknown", () => {
    document.documentElement.lang = "fr";
    const result = localization.t("greeting", { name: "John" });
    expect(result).toBe("Hello John");
  });
});

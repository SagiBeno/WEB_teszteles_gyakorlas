// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import handler from "../../../api/swapi-films.js";
import {
  createMockRequest,
  createMockResponse,
} from "../utils/mockVercelReqRes.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("api/swapi-films handler", () => {
  it("returns 405 when the request method is not GET", async () => {
    // This test verifies request guarding so unsupported methods are rejected early.
    const request = createMockRequest({ method: "POST" });
    const response = createMockResponse();

    await handler(request, response);

    expect(response.statusCode).toBe(405);
    expect(response.payload).toEqual({ error: "Method not allowed" });
  });

  it("returns films from SWAPI when upstream succeeds", async () => {
    const mockFilms = [{ episode_id: 4, title: "A New Hope" }];

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockFilms,
    });

    const request = createMockRequest({ method: "GET" });
    const response = createMockResponse();

    await handler(request, response);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://swapi.info/api/films",
    );
    expect(response.statusCode).toBe(200);
    expect(response.payload).toEqual({ films: mockFilms });
  });

  it("returns 500 when upstream returns a non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => ({}),
    });

    const request = createMockRequest({ method: "GET" });
    const response = createMockResponse();

    await handler(request, response);

    expect(response.statusCode).toBeGreaterThanOrEqual(500);
    expect(response.payload.error).toContain("failed with status 502");
  });
});

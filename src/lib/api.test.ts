import { getTariffs } from "@/lib/api";

const validTariff = {
  id: "1",
  period: "1 месяц",
  price: 1990,
  full_price: 3990,
  is_best: false,
  text: "Тест"
};

describe("getTariffs", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("throws when response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      })
    );

    await expect(getTariffs()).rejects.toThrow("Tariffs fetch failed: 500");
  });

  it("throws when payload is not an array", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ items: [] })
      })
    );

    await expect(getTariffs()).rejects.toThrow("Tariffs payload is not an array");
  });

  it("filters out invalid tariff records", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          validTariff,
          { ...validTariff, id: 42 },
          { bad: true }
        ]
      })
    );

    await expect(getTariffs()).resolves.toEqual([validTariff]);
  });
});

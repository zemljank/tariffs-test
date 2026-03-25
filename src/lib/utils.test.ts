import { calculateDiscountPercent, cn, formatRubles } from "@/lib/utils";

describe("utils", () => {
  it("joins truthy class names", () => {
    expect(cn("card", false, undefined, "active", null)).toBe("card active");
  });

  it("formats rubles with grouping for large numbers", () => {
    expect(formatRubles(5000)).toBe("5000 ₽");
    expect(formatRubles(12000)).toMatch(/12[\s\u00A0\u202F]000 ₽/);
  });

  it("calculates discount percent", () => {
    expect(calculateDiscountPercent(499, 999)).toBe(50);
    expect(calculateDiscountPercent(1000, 1000)).toBe(0);
    expect(calculateDiscountPercent(2000, 1000)).toBe(0);
  });
});

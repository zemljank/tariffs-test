import { createElement } from "react";
import { act, render } from "@testing-library/react";
import HeaderTimer from "@/components/HeaderTimer";

describe("HeaderTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls onExpire once when timer reaches zero", () => {
    const onExpire = vi.fn();
    render(createElement(HeaderTimer, { initialSeconds: 2, onExpire }));

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it("adds critical animation class when 30 seconds or less", () => {
    const { container } = render(
      createElement(HeaderTimer, { initialSeconds: 30, onExpire: vi.fn() })
    );

    expect(container.querySelectorAll(".animate-criticalTimer").length).toBeGreaterThan(0);
  });
});

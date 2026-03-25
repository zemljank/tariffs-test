import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TariffsList from "@/components/TariffsList";
import { Tariff } from "@/types/tariff";

vi.mock("@/components/HeaderTimer", () => ({
  default: ({ onExpire }: { onExpire: () => void }) =>
    createElement(
      "button",
      {
        type: "button",
        onClick: onExpire
      },
      "expire-offer"
    )
}));

const tariffs: Tariff[] = [
  {
    id: "a",
    period: "1 месяц",
    price: 1490,
    full_price: 2990,
    is_best: false,
    text: "Чтобы получить первые результаты"
  },
  {
    id: "b",
    period: "3 месяца",
    price: 2990,
    full_price: 5990,
    is_best: true,
    text: "Привести тело в порядок"
  },
  {
    id: "c",
    period: "1 неделя",
    price: 490,
    full_price: 990,
    is_best: false,
    text: "Чтобы просто начать"
  }
];

describe("TariffsList", () => {
  it("selects best tariff by default", () => {
    render(createElement(TariffsList, { tariffs }));

    const bestTariffButton = screen.getByRole("button", { name: /3 месяца/i });
    expect(bestTariffButton).toHaveAttribute("aria-pressed", "true");
  });

  it("shows agreement validation error on buy without checkbox", async () => {
    const user = userEvent.setup();
    render(createElement(TariffsList, { tariffs }));

    await user.click(screen.getByRole("button", { name: "Купить" }));

    expect(
      screen.getByText("Перед покупкой отметьте чекбокс согласия.")
    ).toBeInTheDocument();
  });

  it("hides agreement error after checking the checkbox and buying", async () => {
    const user = userEvent.setup();
    render(createElement(TariffsList, { tariffs }));

    await user.click(screen.getByRole("button", { name: "Купить" }));
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Купить" }));

    expect(
      screen.queryByText("Перед покупкой отметьте чекбокс согласия.")
    ).not.toBeInTheDocument();
  });

  it("shows offer expiration message when timer expires", async () => {
    const user = userEvent.setup();
    render(createElement(TariffsList, { tariffs }));

    await user.click(screen.getByRole("button", { name: "expire-offer" }));

    expect(screen.getAllByText("Акция завершена").length).toBeGreaterThan(0);
  });
});

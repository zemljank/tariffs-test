"use client";

import { Tariff } from "@/types/tariff";
import { calculateDiscountPercent, cn, formatRubles } from "@/lib/utils";

type TariffCardProps = {
  tariff: Tariff;
  isSelected: boolean;
  isDiscountActive: boolean;
  isFeatured: boolean;
  onSelect: (id: string) => void;
};

const FIGMA_TEXTS: Record<
  string,
  {
    desktop: string;
    mobile: string;
  }
> = {
  "Навсегда": {
    desktop: "Для тех, кто хочет всегда быть в форме и поддерживать здоровье",
    mobile: "Всегда быть в форме"
  },
  "3 месяца": {
    desktop: "Привести тело в порядок",
    mobile: "Привести тело в порядок"
  },
  "1 месяц": {
    desktop: "Чтобы получить первые результаты",
    mobile: "Получить первые результаты"
  },
  "1 неделя": {
    desktop: "Чтобы просто начать",
    mobile: "Чтобы просто начать"
  }
};

export default function TariffCard({
  tariff,
  isSelected,
  isDiscountActive,
  isFeatured,
  onSelect
}: TariffCardProps) {
  const discountPercent = calculateDiscountPercent(tariff.price, tariff.full_price);
  const price = isDiscountActive ? tariff.price : tariff.full_price;
  const figmaText = FIGMA_TEXTS[tariff.period];
  const desktopText = figmaText?.desktop ?? tariff.text;
  const mobileText = figmaText?.mobile ?? tariff.text;

  return (
    <button
      type="button"
      onClick={() => onSelect(tariff.id)}
      className={cn(
        "group relative w-full border text-left text-white transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70",
        isFeatured
          ? "min-h-[102px] rounded-[20px] border-accent bg-[#2c3132] px-4 py-3 min-[376px]:min-h-[110px] min-[376px]:px-5 xl:min-h-[190px] xl:rounded-[34px] xl:px-6 xl:py-6"
          : "min-h-[94px] rounded-[20px] border-border bg-surface px-4 py-3 min-[376px]:min-h-[100px] xl:min-h-[335px] xl:rounded-[40px] xl:px-[21px] xl:pb-[26px] xl:pt-[42px]",
        isSelected
          ? "ring-2 ring-accent/60"
          : "hover:border-[#636a6b] hover:bg-[#363c3d]"
      )}
      aria-pressed={isSelected}
    >
      {discountPercent > 0 && (
        <span className="absolute right-4 top-0 -translate-y-1/2 rounded-md bg-sale px-2 py-1 text-[10px] font-semibold leading-none text-white min-[376px]:text-[11px] xl:text-sm">
          -{discountPercent}%
        </span>
      )}

      {isFeatured && (
        <span className="absolute right-2 top-1.5 text-[10px] font-medium uppercase tracking-[0.06em] text-accent animate-pulseSale min-[376px]:right-3 min-[376px]:top-2 min-[376px]:text-[11px] xl:right-4 xl:text-sm">
          хит!
        </span>
      )}

      <div
        className={cn(
          "grid items-center gap-3 min-[376px]:gap-4",
          isFeatured
            ? "grid-cols-[minmax(0,1fr)_110px] min-[376px]:grid-cols-[minmax(0,1fr)_120px] xl:grid-cols-[180px_1fr] xl:items-center"
            : "grid-cols-[minmax(0,1fr)_95px] min-[376px]:grid-cols-[minmax(0,1fr)_106px] xl:grid-cols-1"
        )}
      >
        <div>
          <div
            className={cn(
              "mb-1 font-medium leading-tight text-white",
              isFeatured
                ? "text-[16px] min-[376px]:text-[18px] xl:text-[26px]"
                : "text-[15px] min-[376px]:text-[16px] xl:text-[26px]"
            )}
          >
            {tariff.period}
          </div>
          <div className="digits text-[44px] font-semibold leading-none text-white min-[376px]:text-[46px] xl:text-[50px]">
            {formatRubles(price)}
          </div>

          {isDiscountActive && tariff.full_price > tariff.price && (
            <div className="digits mt-1 text-[12px] font-normal text-[#919191] line-through min-[376px]:text-[14px] xl:text-[22px]">
              {formatRubles(tariff.full_price)}
            </div>
          )}

          {!isDiscountActive && (
            <p className="mt-2 animate-priceSwap text-[10px] font-semibold uppercase tracking-[0.08em] text-sale xl:text-xs">
              Акция завершена
            </p>
          )}
        </div>

        <p
          className={cn(
            "text-[11px] leading-snug text-[#cdcdcd] min-[376px]:text-xs xl:text-sm",
            isFeatured
              ? "text-left xl:max-w-[330px]"
              : "text-left xl:mt-4"
          )}
        >
          <span className="xl:hidden">{mobileText}</span>
          <span className="hidden xl:inline">{desktopText}</span>
        </p>
      </div>
    </button>
  );
}

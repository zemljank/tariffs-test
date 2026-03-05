"use client";

import { useMemo, useState } from "react";
import HeaderTimer from "@/components/HeaderTimer";
import TariffCard from "@/components/TariffCard";
import { cn } from "@/lib/utils";
import { Tariff } from "@/types/tariff";

type TariffsListProps = {
  tariffs: Tariff[];
};

const HERO_IMAGE_URL =
  "/hero-man.png";
const ATTENTION_TEXT =
  "Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц";
const GUARANTEE_TEXT =
  "Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.";
const DISCLAIMER_TEXT =
  "Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.";

function getDefaultTariffId(tariffs: Tariff[]) {
  if (tariffs.length === 0) {
    return "";
  }

  const bestTariff = tariffs.find((tariff) => tariff.is_best);
  return bestTariff?.id ?? tariffs[0].id;
}

function sortTariffs(tariffs: Tariff[]) {
  return [...tariffs].sort((a, b) => {
    if (a.is_best !== b.is_best) {
      return Number(b.is_best) - Number(a.is_best);
    }

    return b.full_price - a.full_price;
  });
}

export default function TariffsList({ tariffs }: TariffsListProps) {
  const sortedTariffs = useMemo(() => sortTariffs(tariffs), [tariffs]);
  const [selectedTariffId, setSelectedTariffId] = useState(() =>
    getDefaultTariffId(sortedTariffs)
  );
  const [isDiscountExpired, setIsDiscountExpired] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);
  const [heroLoadError, setHeroLoadError] = useState(false);

  const featuredTariff = useMemo(
    () => sortedTariffs.find((tariff) => tariff.is_best) ?? sortedTariffs[0],
    [sortedTariffs]
  );
  const regularTariffs = useMemo(
    () =>
      sortedTariffs.filter((tariff) =>
        featuredTariff ? tariff.id !== featuredTariff.id : true
      ),
    [sortedTariffs, featuredTariff]
  );

  const buyTariff = () => {
    if (!isAgreementChecked) {
      setShowAgreementError(true);
      return;
    }

    setShowAgreementError(false);
  };

  return (
    <>
      <HeaderTimer onExpire={() => setIsDiscountExpired(true)} />
      <main className="app-shell min-h-screen pb-8 pt-[90px] sm:pt-[104px]">
        <div className="mx-auto w-full max-w-[1280px] px-0 xl:px-4">
          <section className="overflow-hidden bg-page pb-6 pt-5 xl:rounded-[60px] xl:border xl:border-border xl:bg-surface xl:px-10 xl:pb-10 xl:pt-8">
            <div className="mx-auto w-full max-w-[375px] px-4 xl:max-w-none xl:px-0">
              <h1 className="max-w-[265px] text-left text-[22px] font-bold leading-[1.08] text-white min-[376px]:max-w-[310px] min-[376px]:text-[24px] md:text-[26px] xl:mx-auto xl:max-w-[860px] xl:text-center xl:text-[40px]">
              Выбери подходящий для себя <span className="text-accent">тариф</span>
              </h1>

              <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(300px,380px)_1fr] xl:gap-6">
                <div>
                  <div className="relative mx-auto h-[190px] w-[120px] min-[376px]:h-[220px] min-[376px]:w-[140px] md:h-[260px] md:w-[170px] xl:h-[767px] xl:w-full">
                    {!heroLoadError && (
                      <picture>
                        <source media="(max-width: 375px)" srcSet="/hero-man-mobile.png" />
                        <img
                          src={HERO_IMAGE_URL}
                          alt="Фитнес-модель"
                          className="h-full w-full object-contain xl:rounded-[30px] xl:object-cover"
                          loading="lazy"
                          onError={() => setHeroLoadError(true)}
                        />
                      </picture>
                    )}
                    <div className="absolute inset-x-0 bottom-0 hidden h-14 bg-gradient-to-t from-page to-transparent xl:block" />
                  </div>
                </div>

                <div className="space-y-2.5 min-[376px]:space-y-3 xl:space-y-4">
                  {featuredTariff && (
                    <TariffCard
                      key={featuredTariff.id}
                      tariff={featuredTariff}
                      isSelected={featuredTariff.id === selectedTariffId}
                      isDiscountActive={!isDiscountExpired}
                      isFeatured
                      onSelect={setSelectedTariffId}
                    />
                  )}

                  <div className="grid gap-2.5 min-[376px]:gap-3 xl:grid-cols-3">
                    {regularTariffs.map((tariff) => (
                      <TariffCard
                        key={tariff.id}
                        tariff={tariff}
                        isSelected={tariff.id === selectedTariffId}
                        isDiscountActive={!isDiscountExpired}
                        isFeatured={false}
                        onSelect={setSelectedTariffId}
                      />
                    ))}
                  </div>

                  <div className="rounded-[16px] border border-border bg-surface-alt px-3 py-3 text-[#dcdcdc] min-[376px]:rounded-[18px] md:rounded-[20px] md:px-5 md:py-[18px]">
                    <p className="text-[11px] leading-snug min-[376px]:text-xs md:text-sm xl:text-base">
                      {ATTENTION_TEXT}
                    </p>
                  </div>

                  <label
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-[14px] border px-3 py-2.5 md:px-4 md:py-3",
                      showAgreementError
                        ? "border-danger bg-[#46292d]"
                        : "border-border bg-[#2a2f30]"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={isAgreementChecked}
                      onChange={(event) => {
                        setIsAgreementChecked(event.target.checked);
                        if (event.target.checked) {
                          setShowAgreementError(false);
                        }
                      }}
                      className="mt-1 h-4 w-4 accent-success"
                    />
                    <span className="text-[11px] leading-snug text-[#dcdcdc] min-[376px]:text-[12px] md:text-sm">
                      Я согласен с офертой рекуррентных платежей и Политикой
                      конфиденциальности
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={buyTariff}
                    className="animate-blinkSoft h-[52px] w-full rounded-[20px] bg-accent text-[17px] font-bold text-[#191e1f] min-[376px]:h-[54px] min-[376px]:text-[18px] md:h-[66px] md:text-[20px]"
                  >
                    Купить
                  </button>

                  {showAgreementError && (
                    <p className="text-[11px] font-semibold text-danger min-[376px]:text-xs md:text-sm">
                      Перед покупкой отметьте чекбокс согласия.
                    </p>
                  )}

                {isDiscountExpired && (
                  <p className="animate-priceSwap text-[10px] font-semibold uppercase tracking-[0.08em] text-sale min-[376px]:text-xs md:text-sm">
                    Акция завершена
                  </p>
                )}

                  <p className="text-[10px] leading-tight text-muted min-[376px]:text-[11px] md:text-xs">
                    {DISCLAIMER_TEXT}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto mt-4 w-full max-w-[375px] rounded-[20px] border border-border bg-surface-alt px-4 py-4 md:px-6 md:py-5 xl:max-w-[1216px]">
            <div className="mb-2 inline-flex rounded-full border border-success/60 bg-[#2d4934] px-4 py-1 text-[11px] font-medium text-success min-[376px]:text-xs md:text-[22px] md:leading-[1.2] xl:text-[28px]">
              гарантия возврата 30 дней
            </div>
            <p className="text-[12px] leading-snug text-[#cdcdcd] min-[376px]:text-[13px] md:text-[16px] md:leading-[1.3] xl:text-[20px]">
              {GUARANTEE_TEXT}
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

import { Tariff } from "@/types/tariff";

const TARIFFS_ENDPOINT = "https://t-core.fit-hub.pro/Test/GetTariffs";

function isValidTariff(value: unknown): value is Tariff {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const maybeTariff = value as Partial<Tariff>;

  return (
    typeof maybeTariff.id === "string" &&
    typeof maybeTariff.period === "string" &&
    typeof maybeTariff.price === "number" &&
    typeof maybeTariff.full_price === "number" &&
    typeof maybeTariff.is_best === "boolean" &&
    typeof maybeTariff.text === "string"
  );
}

export async function getTariffs(): Promise<Tariff[]> {
  const response = await fetch(TARIFFS_ENDPOINT, {
    method: "GET",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Tariffs fetch failed: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Tariffs payload is not an array");
  }

  return data.filter(isValidTariff);
}

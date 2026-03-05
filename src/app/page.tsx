import TariffsList from "@/components/TariffsList";
import { getTariffs } from "@/lib/api";
import { Tariff } from "@/types/tariff";

function EmptyState({ message }: { message: string }) {
  return (
    <main className="app-shell mx-auto flex min-h-screen w-full max-w-2xl items-center px-4 sm:px-6">
      <section className="w-full rounded-2xl border border-[#5c3a3f] bg-surface-alt p-6 text-center">
        <h1 className="mb-2 text-2xl font-black text-white">Не удалось загрузить тарифы</h1>
        <p className="text-sm text-[#dcdcdc]">{message}</p>
      </section>
    </main>
  );
}

export default async function Page() {
  let tariffs: Tariff[] = [];

  try {
    tariffs = await getTariffs();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Сервис временно недоступен.";
    return <EmptyState message={message} />;
  }

  if (tariffs.length === 0) {
    return <EmptyState message="Сервис вернул пустой список тарифов." />;
  }

  return <TariffsList tariffs={tariffs} />;
}

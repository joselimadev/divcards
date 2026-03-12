import { useState } from "react";
import { useCardStackMotion } from "./hooks/use-card-stack-motion";
import { useFlashcardsQuery } from "./hooks/use-flashcards-query";

function getWrappedIndex(index: number, size: number) {
  return (index + size) % size;
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const {
    data: flashcards = [],
    error,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useFlashcardsQuery();

  const normalizedActiveIndex =
    flashcards.length > 0 ? getWrappedIndex(activeIndex, flashcards.length) : 0;
  const visibleCards = useCardStackMotion(flashcards, normalizedActiveIndex);
  const isCardsLoading = isLoading || isFetching;

  const handlePrevious = () => {
    if (flashcards.length === 0) {
      return;
    }

    setActiveIndex((current) =>
      getWrappedIndex(current - 1, flashcards.length),
    );
  };

  const handleNext = () => {
    if (flashcards.length === 0) {
      return;
    }

    setActiveIndex((current) =>
      getWrappedIndex(current + 1, flashcards.length),
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.24),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(244,114,182,0.16),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,1))]" />
      <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:px-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium tracking-[0.2em] text-sky-200 uppercase backdrop-blur-sm">
            divcards
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-none tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Aprenda Melhor,{" "}
            <span className="text-violet-400">Memorize por Mais Tempo</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Crie e estude flashcards sem esforço. Junte-se a estudantes de todo
            o mundo que utilizam o nosso sistema de repetição espaçada
            cientificamente comprovado para passar nos exames e aprender
            idiomas.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-x-6 top-10 h-72 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative mx-auto flex w-full max-w-120 flex-col gap-6">
            <div className="relative h-124 w-full perspective-[1600px]">
              <div className="absolute inset-5 rounded-4xl border border-white/10 bg-slate-950/60 blur-2xl" />

              {isCardsLoading && (
                <article className="absolute inset-x-0 top-0 mx-auto h-112 w-full max-w-md rounded-4xl border border-white/12 bg-slate-900/80 p-7 shadow-[0_24px_80px_rgba(15,23,42,0.45)] ring-1 ring-white/6 backdrop-blur-xl">
                  <div className="h-full animate-pulse rounded-3xl border border-white/10 bg-white/5" />
                </article>
              )}

              {isError && (
                <article className="absolute inset-x-0 top-0 mx-auto flex h-112 w-full max-w-md flex-col justify-between rounded-4xl border border-rose-300/30 bg-rose-950/40 p-7 shadow-[0_24px_80px_rgba(15,23,42,0.45)] ring-1 ring-rose-200/20 backdrop-blur-xl">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-rose-200 uppercase">
                      Erro ao carregar
                    </p>
                    <p className="mt-4 text-lg text-rose-100">
                      {error instanceof Error
                        ? error.message
                        : "Falha ao buscar flashcards."}
                    </p>
                  </div>

                  <button
                    className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-rose-200/40 bg-rose-300/15 px-4 py-2 text-sm font-medium text-rose-50 transition hover:bg-rose-300/25"
                    onClick={() => {
                      void refetch();
                    }}
                    type="button"
                  >
                    Tentar novamente
                  </button>
                </article>
              )}

              {!isCardsLoading &&
                visibleCards.map(({ card, index, motion }) => {
                  return (
                    <article
                      key={card.word}
                      aria-hidden={!motion.isActive}
                      className="absolute inset-x-0 top-0 mx-auto h-112 w-full max-w-md origin-bottom-left rounded-4xl border border-white/12 bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.45)] ring-1 ring-white/6 backdrop-blur-xl transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:p-7"
                      style={{
                        zIndex: motion.zIndex,
                        opacity: motion.opacity,
                        transform: `translate3d(${motion.translateX}px, ${motion.translateY}px, 0) rotate(${motion.rotate}deg) scale(${motion.scale})`,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-4xl opacity-70"
                        style={{
                          backgroundImage: `linear-gradient(145deg, rgba(34,211,238,0.18), rgba(15,23,42,0.02) 32%, rgba(244,114,182,0.14))`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      />

                      <div className="relative flex h-full flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold tracking-[0.32em] text-cyan-200 uppercase">
                              Word
                            </p>
                            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                              {card.word}
                            </h2>
                          </div>

                          <div className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium tracking-[0.24em] text-slate-200 uppercase">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                        </div>

                        <div className="mt-8 space-y-5 text-slate-200">
                          <div className="rounded-3xl border border-white/10 bg-black/15 p-4">
                            <p className="text-xs font-semibold tracking-[0.24em] text-sky-200 uppercase">
                              Description
                            </p>
                            <p className="mt-3 text-base leading-7 text-slate-100/92">
                              {card.description}
                            </p>
                          </div>

                          <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                            <p className="text-xs font-semibold tracking-[0.24em] text-pink-200 uppercase">
                              Use case
                            </p>
                            <p className="mt-3 text-base leading-7 text-slate-100/90">
                              {card.useCase}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
            <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-md">
              <div>
                <p className="text-xs font-semibold tracking-[0.35em] text-sky-200 uppercase">
                  Deck Preview
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {isCardsLoading
                    ? "Atualizando deck..."
                    : "Navegue pelos cartões."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  aria-label="Proxima carta"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-lg text-white transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-slate-800"
                  disabled={flashcards.length < 2 || isFetching}
                  onClick={() => {
                    void refetch();
                  }}
                  type="button"
                >
                  ↻
                </button>
                <button
                  aria-label="Carta anterior"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-lg text-white transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-slate-800"
                  disabled={flashcards.length < 2 || isFetching}
                  onClick={handlePrevious}
                  type="button"
                >
                  ←
                </button>
                <button
                  aria-label="Proxima carta"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-900/80 text-lg text-white transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-slate-800"
                  disabled={flashcards.length < 2 || isFetching}
                  onClick={handleNext}
                  type="button"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

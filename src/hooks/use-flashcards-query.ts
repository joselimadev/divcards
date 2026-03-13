import { useQuery } from "@tanstack/react-query";

const FLASHCARDS_API_URL =
  import.meta.env.VITE_FLASHCARDS_API_URL ?? "http://localhost:8787";

export type Flashcard = {
  word: string;
  description: string;
  useCase: string;
};

type FlashcardsApiResponse = {
  cards?: unknown;
};

function isFlashcard(value: unknown): value is Flashcard {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.word === "string" &&
    typeof candidate.description === "string" &&
    typeof candidate.useCase === "string"
  );
}

function normalizeFlashcards(payload: unknown): Flashcard[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const response = payload as FlashcardsApiResponse;

  if (!Array.isArray(response.cards)) {
    return [];
  }

  return response.cards.filter(isFlashcard);
}

async function fetchFlashcards(theme: string) {
  const params = new URLSearchParams({
    theme,
  });
  const response = await fetch(
    `${FLASHCARDS_API_URL}/api/flashcards?${params.toString()}`,
  );

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;

    throw new Error(payload?.error || "Nao foi possivel buscar os flashcards.");
  }

  const payload = (await response.json()) as unknown;
  const cards = normalizeFlashcards(payload);

  if (cards.length === 0) {
    throw new Error("A API retornou dados em formato inesperado.");
  }

  return cards;
}

export function useFlashcardsQuery(theme: string) {
  return useQuery({
    queryKey: ["flashcards", theme],
    queryFn: () => fetchFlashcards(theme),
    staleTime: 1000 * 60 * 5,
  });
}

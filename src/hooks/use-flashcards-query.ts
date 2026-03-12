import { useQuery } from "@tanstack/react-query";

const FLASHCARDS_URL = "https://fiap-bff-2502.onrender.com/ask";

export type Flashcard = {
  word: string;
  description: string;
  useCase: string;
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
  if (Array.isArray(payload)) {
    return payload.filter(isFlashcard);
  }

  if (isFlashcard(payload)) {
    return [payload];
  }

  return [];
}

async function fetchFlashcards() {
  const response = await fetch(FLASHCARDS_URL);

  if (!response.ok) {
    throw new Error("Nao foi possivel buscar os flashcards na API.");
  }

  const payload = (await response.json()) as unknown;
  const cards = normalizeFlashcards(payload);

  if (cards.length === 0) {
    throw new Error("A API retornou dados em formato inesperado.");
  }

  return cards;
}

export function useFlashcardsQuery() {
  return useQuery({
    queryKey: ["flashcards"],
    queryFn: fetchFlashcards,
    staleTime: 1000 * 60 * 5,
  });
}

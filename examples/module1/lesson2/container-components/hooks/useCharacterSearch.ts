import { useEffect, useState } from 'react';
import type { Character } from '../types/Character';
import { fetchCharacters } from '../services/fetchCharacters';

export function useCharacterSearch(name: string, gender: string) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name && !gender) return;

    setLoading(true);
    setError(null);

    fetchCharacters(name, gender)
      .then((data) => setCharacters(data))
      .catch(() => setError('Failed to fetch characters'))
      .finally(() => setLoading(false));
  }, [name, gender]);

  return { characters, loading, error };
}
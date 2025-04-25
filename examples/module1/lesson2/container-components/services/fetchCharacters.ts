import type { Character } from '../types/Character';

export async function fetchCharacters(name: string, gender: string): Promise<Character[]> {
  const url = new URL('https://rickandmortyapi.com/api/character/');
  if (name) url.searchParams.append('name', name);
  if (gender) url.searchParams.append('gender', gender);

  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
}
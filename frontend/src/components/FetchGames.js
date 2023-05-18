import { useEffect, useState } from 'react';
import { client } from '../utils/sanity/client';

export default function FetchGames({ fetchFavorites }) {
  const [games, setGames] = useState([]);
  const [gameCount, setGameCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let query;

      if (fetchFavorites) {
        // Fetch alle favoritter ved bruk av GROQ spørring
        query = `*[ _type == "spill" && favoritt == true ] | order(_updatedAt desc)`;
      } else {
        // Fetch alle spill ved bruk av GROQ spørring
        query = `*[ _type == "spill" ] | order(_createdAt desc)`;
      }

      try {
        const gameData = await client.fetch(query);
        const apiKey = '3bfd04e4e7a04078b214294009cd610c';

        const updatedGames = await Promise.all(
          gameData.map(async (game) => {
            const { apiId } = game;

            if (!apiId) {
              return game; // Hopp over henting av data fra APIen hvis API ID ikke er tilgjengelig
            }

            // Sjekk om spilldetaljer er lagret i localStorage
            const cacheKey = `game_${apiId}`;
            const cachedGame = localStorage.getItem(cacheKey);

            if (cachedGame) {
              return JSON.parse(cachedGame); // Returner cacheverdien hvis tilgjengelig
            }

            // Hent spilldetaljer fra APIen 
            const response = await fetch(`https://api.rawg.io/api/games/${apiId}?key=${apiKey}`);

            const apiGameData = await response.json();

            // Slå sammen Sanity spilldata og API spilldata
            const updatedGame = { ...game, ...apiGameData };

            // Lagre spilldetaljer i localStorage
            localStorage.setItem(cacheKey, JSON.stringify(updatedGame));

            return updatedGame;
          })
        );

        setGames(updatedGames);
        setGameCount(updatedGames.length);
      } catch (error) {
        setError('Failed to fetch API');
      }

      setLoading(false);
    };

    fetchData();
  }, [fetchFavorites]);

  return { games, gameCount, loading, error };
}

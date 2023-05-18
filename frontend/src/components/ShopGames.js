import { useEffect, useState } from 'react';

export default function Games() {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [etag, setETag] = useState(null);
  const [lastModified, setLastModified] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);

      const apiKey = '3bfd04e4e7a04078b214294009cd610c';

      const requestOptions = {
        headers: {},
      };

      // Inkluderer "Last-Modified" header hvis tilgjengelig
      if (lastModified) {
        requestOptions.headers['If-Modified-Since'] = lastModified;
      }

      // Inkluderer ETag header hvis tilgjengelig
      if (etag) {
        requestOptions.headers['If-None-Match'] = etag;
      }

      const response = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&ordering=-popular&page=${currentPage}&page_size=12`, //I stedet for å hente de nyeste spillene (-released), så hentet vi de mest populære spillene (-popular). Nesten alle av de nyeste (-released) spillene hadde ikke bilde, eller var ikke engang et spill.
        requestOptions
      );

      if (response.status === 304) {
        // Hvis innholdet ikke er endret, bruk cached (localStorage) spill
        const cachedGames = localStorage.getItem('games');
        if (cachedGames) {
          setGames(JSON.parse(cachedGames));
          setLoading(false);
        }
      } else if (response.ok) {
        // Hvis innholdet blir endret, oppdater spill og localStorage(cache)
        const data = await response.json();
        const fetchedGames = data.results;

        setGames(fetchedGames);
        localStorage.setItem('games', JSON.stringify(fetchedGames));

        // Lagre "Last-Modified" og ETag headers for fremtidige forespørsler
        const newLastModified = response.headers.get('Last-Modified');
        const newETag = response.headers.get('ETag');
        setLastModified(newLastModified);
        setETag(newETag);
        setLoading(false);
      }
    };

    fetchGames();
  }, [currentPage, etag, lastModified]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return { games, nextPage, previousPage, loading };
}

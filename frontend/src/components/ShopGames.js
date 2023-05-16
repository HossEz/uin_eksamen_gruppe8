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

      // Include Last-Modified header if available
      if (lastModified) {
        requestOptions.headers['If-Modified-Since'] = lastModified;
      }

      // Include ETag header if available
      if (etag) {
        requestOptions.headers['If-None-Match'] = etag;
      }

      const response = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&ordering=-popular&page=${currentPage}&page_size=12`,
        requestOptions
      );

      if (response.status === 304) {
        // Content not modified, use cached games
        const cachedGames = localStorage.getItem('games');
        if (cachedGames) {
          setGames(JSON.parse(cachedGames));
          setLoading(false);
        }
      } else if (response.ok) {
        // Content modified, update games and cache
        const data = await response.json();
        const fetchedGames = data.results;

        setGames(fetchedGames);
        localStorage.setItem('games', JSON.stringify(fetchedGames));

        // Store Last-Modified and ETag headers for future requests
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

import { useState, useEffect } from 'react';
import { client } from '../utils/sanity/client';

export default function FetchGenre({ genreRef }) {
  const [genreTitle, setGenreTitle] = useState('');

  useEffect(() => {
    const fetchGenreTitle = async () => {
      const query = `*[_id == "${genreRef}"].tittel`;
      const genreData = await client.fetch(query);
      if (genreData && genreData.length > 0) {
        setGenreTitle(genreData[0]);
      }
    };

    fetchGenreTitle();
  }, [genreRef]);

  return <span>{genreTitle}</span>;
}

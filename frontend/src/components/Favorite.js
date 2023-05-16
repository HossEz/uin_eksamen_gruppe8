import { useState, useEffect, useCallback } from 'react';
import { writeClient } from '../utils/sanity/client';

export default function Favorites({ game }) {
  const [isFavorite, setIsFavorite] = useState(game.favoritt);

  const toggleFavorite = useCallback(async () => {
    const updatedFavorite = !isFavorite;

    // Update the favorite status in the component immediately
    setIsFavorite(updatedFavorite);

    // Update the favorite status in local storage
    localStorage.setItem(game._id, updatedFavorite.toString());

    // Update the favorite status in Sanity
    await writeClient.patch(game._id).set({ favoritt: updatedFavorite }).commit();
  }, [game._id, isFavorite]);

  useEffect(() => {
    // Check local storage for the favorite status on component mount
    const storedFavorite = localStorage.getItem(game._id);
    if (storedFavorite !== null) {
      setIsFavorite(storedFavorite === 'true');
    }
  }, [game._id]);

  return (
    <div className="favorite-icon" onClick={toggleFavorite}>
      <svg
        viewBox="0 0 24 24"
        fill={isFavorite ? 'red' : '#272727'}
        stroke={isFavorite ? 'black' : 'white'}
        strokeWidth={isFavorite ? '2' : '1.5'}
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21.35l-1.547-1.396C4.656 14.879 2 12.021 2 8.5 2 5.463 4.462 3 7.5 3c1.947 0 3.862.992 4.95 2.641C13.638 3.992 15.553 3 17.5 3 20.538 3 23 5.463 23 8.5c0 3.521-2.656 6.379-8.453 11.455L12 21.35z"
        />
      </svg>
    </div>
  );
}

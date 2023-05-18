import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function GameDetails() {
  const { slug } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetails = async () => {
      const apiKey = '3bfd04e4e7a04078b214294009cd610c';
      
      // Sjekker om spilldetaljene allerede er cached
      const cachedGameDetails = localStorage.getItem(slug);
      if (cachedGameDetails) {
        setGameDetails(JSON.parse(cachedGameDetails));
        return;
      }
      
      const response = await fetch(
        `https://api.rawg.io/api/games/${slug}?key=${apiKey}`
      );
      const data = await response.json();
      
      // Setter spilldetaljene i localStorage
      localStorage.setItem(slug, JSON.stringify(data));
      setGameDetails(data); 
    };

    fetchGameDetails();
  }, [slug]);

  const goBack = () => {
    navigate(-1);
  };

  if (!gameDetails) {
    return (
      <div className="loader-overlay">
        <div className="custom-loader"></div>
      </div>
    );
  }

  const {
    name,
    background_image,
    rating,
    description_raw,
    tags,
    developers,
    publishers,
    released,
    platforms,
    stores,
  } = gameDetails;

  return (
    
    <section className="game-details-container">
        <button className="btn2" onClick={goBack}>Tilbake</button>
      <h2>{name}</h2>
      <img src={background_image} alt={name} />
      <p><b>Rating:</b> {rating} <svg style={{ marginBottom:-1}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16"> <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" fill="#1b1b1b" stroke="#ffdf00"></path> </svg></p>
      <p>{description_raw}</p>
      <p><b>Tags:</b> {tags.map((tag) => tag.name).join(', ')}</p>
      <p><b>Utvikler(e):</b> {developers.map((dev) => dev.name).join(', ')}</p>
      <p><b>Utgiver(e):</b> {publishers.map((pub) => pub.name).join(', ')}</p>
      <p><b>Utgivelsesår:</b> {released}</p>
      <p><b>Platformer:</b> {platforms.map((platform) => platform.platform.name).join(', ')}</p>
      <h3>Kjøpsmuligheter:</h3>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            <a
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {store.store.name}
            </a>
          </li>
        ))}
      </ul>





    </section>
  );
}

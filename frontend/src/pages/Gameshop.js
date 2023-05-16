import { Link } from 'react-router-dom';
import Games from '../components/ShopGames';
import NextPage from '../components/NextPage';
import PreviousPage from '../components/PreviousPage';

export default function Gameshop({ numShowcaseGames, isHomePage }) {
  const { games, nextPage, previousPage, loading } = Games();
  const showcaseGames = games.slice(0, numShowcaseGames);

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <section className="gameshop-container">
      <div className="gameshop-header">
        <h2>Spillbutikk</h2>
        {isHomePage && (
          <Link to="/spillbutikk">
            <button className="btn2">Gå til Spillbutikk</button>
          </Link>
        )}
      </div>
      <section className="mygames">
      {showcaseGames.map((game) => (
          <article className="game-card" key={game.id}>
            {game.background_image ? (
              <img src={game.background_image} alt={game.name} />
            ) : (
              <img src="https://nef.no/wp-content/uploads/2022/09/placeholder.png" alt="Placeholder" />
            )}
            <Link to={`/spill/${game.slug}`}>
              <h3>{game.name}</h3>
            </Link>
            <p>
              <b>Rating:</b> {game.rating}{" "}
              <svg
                style={{ marginBottom: -1 }}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                  fill="#1b1b1b"
                  stroke="#ffdf00"
                ></path>{" "}
              </svg>
            </p>
            <Link to={`/spill/${game.slug}`}>
              <button className="btn3">Kjøp</button>
            </Link>
          </article>
        ))}
      </section>
      {!isHomePage && (
        <div className="nextprev-container">
          <PreviousPage previousPage={previousPage} />
          <NextPage nextPage={nextPage} />
        </div>
      )}
    </section>
  );
}

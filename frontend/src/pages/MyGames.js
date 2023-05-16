import { Link } from 'react-router-dom';
import FetchGames from '../components/FetchGames';
import FetchGenre from '../components/FetchGenre';
import Favorites from '../components/Favorite';

export default function MyGames() {
  const { games, gameCount, loading } = FetchGames({ fetchFavorites: false });

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <section className="mygames-container">
      <h1>Mine Spill - {gameCount}</h1>
      <section className="mygames">
        {games.map((game) => (
          <article className="game-card" key={game._id}>
            <Favorites game={game} />
            <img
              src={
                game.apiId
                  ? game.background_image
                  : 'https://nef.no/wp-content/uploads/2022/09/placeholder.png'
              }
              alt={game.name}
            />
            <h3>{game.tittel}</h3>
            <p>
            <b>Sjanger:</b>{' '}
              {game.sjangere.map((sjanger) => (
                <span key={sjanger._ref}>
                  <FetchGenre genreRef={sjanger._ref} />
                  {game.sjangere.indexOf(sjanger) !== game.sjangere.length - 1 && ','}{' '}
                </span>
              ))}
            </p>
            <p>
              <b>Spilletid:</b> {game.timerSpilt} Timer
            </p>
            <Link to={`/spill/${game.slug}`} className="link-gamecard">
              <button className="btn3">Les mer</button>
            </Link>
          </article>
        ))}
      </section>
    </section>
  );
}

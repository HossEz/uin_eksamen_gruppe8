import { Link } from "react-router-dom";
import FetchGames from "../components/FetchGames";
import Favorites from "../components/Favorite";
import FetchGenre from "../components/FetchGenre";

export default function MyFav({ isHomePage }) {
  const { games: favoriteGames, gameCount, loading } = FetchGames({ fetchFavorites: true });

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="custom-loader"></div>
      </div>
    );
  }

  if (favoriteGames.length === 0 && isHomePage) {
    return null; // Return null to hide the whole aside element
  }
  
  return (
    <section className="myfav-container">
      <h2>{favoriteGames.length === 0 ? 'Du har ingen favoritter lagt til!' : `Mine Favoritter - ${gameCount}`}</h2>
      <section className="mygames">
        {favoriteGames.map((game) => (
          <article className="game-card" key={game._id}>
            <Favorites game={game} />
            <img
              src={
                game.apiId
                  ? game.background_image
                  : "https://nef.no/wp-content/uploads/2022/09/placeholder.png"
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
            <Link to={`/spill/${game.slug}`} key={game._slug} className="link-gamecard">
              <button className="btn3">Les mer</button>
            </Link>
          </article>
        ))}
      </section>
    </section>
  );
};

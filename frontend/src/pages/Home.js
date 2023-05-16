import Gameshop from './Gameshop';
import MyFav from './MyFav';
import MyGames from './MyGames';

export default function Home() {
  return (
    <section className="home-container">
      <section className="content">
        <section className="main">
            <Gameshop numShowcaseGames={4} isHomePage={true}/>
            <MyGames />
        </section>
        <section className='home-fav'>
          <aside className="sidebar">
              <MyFav isHomePage={true}/>
          </aside>
        </section>
      </section>
    </section>
  );
}

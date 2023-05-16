import { Route, Routes } from 'react-router-dom';
import './styles/css/main.css';
import Gameshop from './components/Gameshop';
import MyFav from './components/MyFav';
import Home from './pages/Home';
import MyGames from './pages/MyGames';

function App() {
  return (
    <section className='container'>
      <MainLayout>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/mine-spill' element={<MyGames />}/>
          <Route path='/mine-favoritter' element={<MyFav />}/>
          <Route path='/spillbutikk' element={<Gameshop />}/>
          <Route path="/spill/:slug" element={<GameDetails />} />
        </Routes>
      </MainLayout>
    </section>
  );
}

export default App;

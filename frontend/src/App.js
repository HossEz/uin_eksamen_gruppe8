import { Route, Routes } from 'react-router-dom';
import './styles/css/main.css';
import Home from './components/Home';
import MyGames from './components/MyGames.js';
import Gameshop from './components/Gameshop';
import MyFav from './components/MyFav';

function App() {
  return (
    <section className='container'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/my-games' element={<MyGames />}/>
        <Route path='/my-favourites' element={<MyFav />}/>
        <Route path='/gameshop' element={<Gameshop />}/>
      </Routes>
    </section>
  );
}

export default App;

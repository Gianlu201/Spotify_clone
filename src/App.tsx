import { BrowserRouter, Route, Routes } from 'react-router';
import TopNavbar from './components/TopNavbar';
import SideBar from './components/SideBar';
import MainPage from './components/MainPage';
import Player from './components/Player';
import ArtistPage from './components/ArtistPage';

function App() {
  return (
    <div className='bg-black relative'>
      <TopNavbar />

      <div className='grid grid-cols-24 gap-4'>
        <div className='col-span-5 min-h-full'>
          <SideBar />
        </div>
        <div className='col-span-19 h-[90vh] overflow-y-auto pe-2'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/artist/:artistId' element={<ArtistPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>

      <Player />
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router';
import TopNavbar from './components/TopNavbar';
import SideBar from './components/SideBar';
import MainPage from './components/MainPage';
import Player from './components/Player';

function App() {
  return (
    <div className='bg-black relative'>
      <TopNavbar />

      <div className='grid grid-cols-24 gap-4'>
        <div className='col-span-5 min-h-full'>
          <SideBar />
        </div>
        <div className='col-span-19'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>

      <Player />
    </div>
  );
}

export default App;

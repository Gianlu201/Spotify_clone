import { BrowserRouter } from 'react-router';
import TopNavbar from './components/TopNavbar';
import SideBar from './components/SideBar';
import MainPage from './components/MainPage';

function App() {
  return (
    <div className='bg-black'>
      <TopNavbar />

      <div className='grid grid-cols-24 gap-4'>
        <div className='col-span-5 min-h-full'>
          <SideBar />
        </div>
        <div className='col-span-19'>
          <MainPage />
        </div>
      </div>
      <BrowserRouter></BrowserRouter>
    </div>
  );
}

export default App;

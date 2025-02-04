import { useState } from 'react';
import {
  BsBell,
  BsCollection,
  BsHouseDoorFill,
  BsPersonFill,
  BsSearch,
} from 'react-icons/bs';

export default function TopNavbar() {
  const [query, setQuery] = useState<string>();

  return (
    <div className=' flex justify-between items-center bg-black text-white p-2'>
      <div className=' w-12'>
        <img
          src='../../public/assets/images/Spotify_Primary_Logo_RGB_White.png'
          alt='logo spotify'
          className='cursor-pointer'
        />
      </div>
      <div className='flex items-center '>
        <button className='bg-[#2A2A2A] w-10 aspect-1/1 rounded-full text-white me-2 cursor-pointer'>
          <BsHouseDoorFill className=' mx-auto text-2xl p-0.5' />
        </button>
        <form className=' bg-[#2A2A2A] border-white focus:border-2  block h-full p-2 pt-3 rounded-full'>
          <button type='submit' className='cursor-pointer ms-2'>
            <BsSearch className='text-lg' />
          </button>
          <input
            type='text'
            name='searchBarField'
            className='h-full w-2xl border-e border-gray-400 me-2 focus:border-0'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button type='button' className='cursor-pointer mx-2'>
            <BsCollection className='text-lg' />
          </button>
        </form>
      </div>
      <div>
        <button className='cursor-pointer'>
          <BsBell className='text-xl' />
        </button>
        <button className='cursor-pointer'>
          <BsPersonFill className='text-xl' />
        </button>
      </div>
    </div>
  );
}

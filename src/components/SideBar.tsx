import { BsArrowRightShort } from 'react-icons/bs';

export default function SideBar() {
  return (
    <div className='bg-[#121212] rounded-2xl px-4 py-4 min-h-full'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center text-gray-400 font-bold hover:text-white hover:fill-white cursor-pointer '>
          <svg className=' w-8 h-8 inline-block mt-1.5'>
            <path
              className=' fill-gray-400'
              d='M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z'
            ></path>
          </svg>
          <h3 className=' '>Your Library</h3>
        </div>

        <div>
          <button className=' text-gray-400 rounded-full cursor-pointer hover:text-white hover:bg-[#1F1F1F]'>
            <BsArrowRightShort className=' size-8' />
          </button>
        </div>
      </div>

      <div className='text-white text-sm mt-2'>
        <button className='bg-[#2A2A2A] rounded-full px-3 font-medium py-1 cursor-pointer me-2 hover:bg-[#333333]'>
          Playlist
        </button>
        <button className='bg-[#2A2A2A] rounded-full px-3 font-medium py-1 cursor-pointer me-2 hover:bg-[#333333]'>
          Artista
        </button>
        <button className='bg-[#2A2A2A] rounded-full px-3 font-medium py-1 cursor-pointer me-2 hover:bg-[#333333]'>
          Podcast & Shows
        </button>
      </div>
    </div>
  );
}

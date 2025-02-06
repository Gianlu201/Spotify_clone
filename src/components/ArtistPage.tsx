/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link, Params, useParams } from 'react-router';
import { AlbumSrc, ArtistSrc, Contributor, Track } from '../types/types';
import { BsPatchCheckFill, BsPlayFill, BsThreeDots } from 'react-icons/bs';
import TracksList from './TracksList';
import { useAppDispatch } from '../redux/app/hooks';
import { setCurrentSongAction } from '../redux/actions';

const initialArtist: ArtistSrc = {
  id: 0,
  name: '',
  link: '',
  share: '',
  picture: '',
  picture_small: '',
  picture_medium: '',
  picture_big: '',
  picture_xl: '',
  nb_album: 0,
  nb_fan: 0,
  radio: false,
  tracklist: '',
  type: 'Artist',
};

export default function ArtistPage() {
  const [currentArtist, setCurrentArtist] = useState<ArtistSrc>(initialArtist);
  const [currentTracks, setCurrentTracks] = useState<Track[]>([]);
  const [tracksByMostFamous, setTracksByMostFamous] = useState<Track[]>([]);
  const [albumArr, setAlbumArr] = useState<AlbumSrc[]>([]);
  const [artistContributors, setArtistContributors] = useState<Contributor[]>(
    []
  );
  const [discographySelection, setDiscographySelection] =
    useState<string>('popular_releases');

  const params = useParams() as Params;

  const dispatch = useAppDispatch();

  const getArtist = async () => {
    const URL = `https://deezerdevs-deezer.p.rapidapi.com/artist/${params.artistId}`;

    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            'd199ac2f7cmshc83995374704875p160fb9jsnc22720509b31',
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      });

      if (response.ok) {
        const data = (await response.json()) as ArtistSrc;
        setCurrentArtist(data);
        console.log(data);
        getTrack(data.tracklist, data.id);
      } else {
        throw new Error('Errore nel recupero dei dati');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTrack = async (URL: string, artistId: number) => {
    const MyURL = `https://cors-anywhere.herokuapp.com/${URL}`;
    try {
      const response = await fetch(MyURL, {
        method: 'GET',
        headers: {
          Host: 'api.deezer.com',
          Accept: '/',
          'Accept-Encoding': 'gzip, deflate, br',
          'Access-Control-Allow-Origin': '*',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('ECCOLEEE');
        console.log(data.data);
        setCurrentTracks(data.data);
        getTracksByMostFamous(data.data);
        searchNewContributor(data.data, artistId);
        getAlbums(data.data);
      } else {
        console.log('ei');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTracksByMostFamous = (tracks: Track[]) => {
    const tracksCopy = [...tracks];
    tracksCopy.sort(compareRanking).reverse();
    setTracksByMostFamous(tracksCopy);
  };

  const compareRanking = (track1: Track, track2: Track) => {
    return track1.rank - track2.rank;
  };

  const getAlbums = async (tracks: Track[]) => {
    const myAlbumIds: number[] = [];
    tracks.forEach((track) => {
      if (!myAlbumIds.includes(track.album.id)) {
        myAlbumIds.push(track.album.id);
      }
    });
    myAlbumIds.forEach((id) => {
      getAlbum(id);
    });
  };

  const getAlbum = async (id: number) => {
    const ALBUM_URL = `https://deezerdevs-deezer.p.rapidapi.com/album/${id}`;
    try {
      const response = await fetch(ALBUM_URL, {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            'd199ac2f7cmshc83995374704875p160fb9jsnc22720509b31',
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      });
      if (response.ok) {
        const data = (await response.json()) as AlbumSrc;
        console.log(data);
        setAlbumArr((state) => state.concat(data));
      } else {
        throw new Error('Errore nel recupero album');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchNewContributor = (tracks: Track[], artistId: number) => {
    const contributorsArr: Contributor[] = [];
    tracks.forEach((track) => {
      track.contributors?.forEach((contributor) => {
        if (
          contributor.id !== artistId &&
          contributorsArr.findIndex(
            (element) => element.id === contributor.id
          ) < 0
        ) {
          contributorsArr.push(contributor);
        }
      });
    });
    setArtistContributors(contributorsArr);
  };

  useEffect(() => {
    getArtist();
  }, [params.artistId]);

  return (
    <div className='bg-[#121212] rounded-2xl min-h-full overflow-hidden pb-20'>
      <section className='h-[250px] relative overflow-hidden'>
        <img
          src={currentArtist.picture_xl}
          alt='artist poster'
          className='w-full block relative bottom-120 opacity-65'
        />
        <div className='h-full w-full absolute top-0 start-0 text-white flex flex-col justify-around ps-5 pt-10 pb-3'>
          <p className='flex'>
            <BsPatchCheckFill className='text-2xl text-[#4CB3FF] me-2' />{' '}
            Verified Artist
          </p>
          <h1 className='text-8xl font-bold'>{currentArtist.name}</h1>
          <p className='font-medium'>
            {currentArtist.nb_fan} monthly listeners
          </p>
        </div>
      </section>

      <div className='px-8 py-4 text-white flex items-center gap-6'>
        <button className='cursor-pointer bg-[#1ED760] rounded-full justify-center items-center w-fit aspect-1/1 p-1 hover:bg-[#3BE477]'>
          <BsPlayFill className='text-black text-4xl' />
        </button>
        <button className='cursor-pointer border border-gray-500 rounded-full px-3 py-0.5 pb-1 text-sm hover:border-white hover:scale-110'>
          Follow
        </button>
        <button className='cursor-pointer'>
          <BsThreeDots className='text-2xl text-gray-500 hover:text-white' />
        </button>
      </div>

      <section className='px-8 py-4'>
        <div className='grid grid-cols-24'>
          <div className='col-span-14 text-white'>
            {currentTracks?.length && (
              <TracksList artist={currentArtist} tracks={currentTracks} />
            )}
          </div>

          <div className='col-span-10 text-white ps-3'>
            <h2 className='text-2xl font-bold mb-4'>Artist pick</h2>
            <div className='w-[75%] aspect-16/9 overflow-hidden rounded-lg relative'>
              <img
                src={currentArtist.picture_big}
                alt='artist poster'
                className='w-full aspect-16/9 opacity-80'
                style={{
                  WebkitFilter: 'blur(1px)',
                }}
              />
              <div className='absolute top-0 start-0 h-full ps-3 py-3 flex flex-col justify-between'>
                <div className='flex items-center bg-white w-fit ps-0.5 pe-2 py-0.5 rounded-full'>
                  <img
                    src={currentArtist.picture_small}
                    alt='artist picture'
                    className='rounded-full aspect-1/1 w-[20px] me-2'
                  />
                  <span className='text-black font-medium text-sm'>
                    All the hits on one playlist!
                  </span>
                </div>
                <div className='text-white flex items-center'>
                  <img
                    src={currentArtist.picture}
                    alt='artist picture'
                    className='rounded-md max-w-[70px]'
                  />
                  <div className='ms-2'>
                    <p className='font-bold brightness-200'>
                      {currentArtist.name} Best Of - The Hits
                    </p>
                    <span className='text-sm font-bold text-gray-500 brightness-150'>
                      Playlist
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='px-8 text-white'>
        <h2 className='text-2xl font-bold mb-4'>Discography</h2>
        <div>
          <button
            className={'bg-[#2A2A2A] rounded-full px-3 font-medium py-1 cursor-pointer me-2 hover:bg-[#333333] '.concat(
              discographySelection === 'popular_releases' ? 'activeBtn' : ''
            )}
            onClick={() => setDiscographySelection('popular_releases')}
          >
            Popular releases
          </button>
          <button
            className={'bg-[#2A2A2A] rounded-full px-3 font-medium py-1 cursor-pointer me-2 hover:bg-[#333333] '.concat(
              discographySelection === 'albums' ? 'activeBtn' : ''
            )}
            onClick={() => setDiscographySelection('albums')}
          >
            Albums
          </button>
        </div>
        <div className='mt-5'>
          {tracksByMostFamous.length > 0 &&
            discographySelection === 'popular_releases' && (
              <div className='grid grid-cols-7'>
                {tracksByMostFamous.slice(0, 7).map((track) => {
                  return (
                    <div
                      key={track.id}
                      className='trackCard col-span-1 px-3 py-3 rounded-md overflow-x-hidden hover:bg-[#2A2A2A]'
                    >
                      <div className='relative'>
                        <img
                          src={track.album.cover_medium}
                          alt='track album image'
                          className='w-[100%] mx-auto cursor-pointer rounded-lg'
                        />
                        <button
                          className='btnPlayMusic cursor-pointer bg-[#1ED760] rounded-full justify-center items-center w-fit aspect-1/1 p-1 hover:bg-[#3BE477] absolute bottom-2 end-2 hidden'
                          onClick={() => dispatch(setCurrentSongAction(track))}
                        >
                          <BsPlayFill className='text-black text-3xl' />
                        </button>
                      </div>
                      <p className='text-lg font-bold mt-2 line-clamp-2'>
                        {track.title}
                      </p>
                      <p className='text-sm text-gray-400 mt-1 line-clamp-2'>
                        from{' '}
                        <span className='cursor-pointer font-semibold'>
                          {track.album.title}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

          {albumArr.length > 0 && discographySelection === 'albums' && (
            <div className='grid grid-cols-7'>
              {albumArr.slice(0, 7).map((album) => {
                return (
                  <div
                    key={album.id}
                    className=' col-span-1 px-3 py-3 rounded-md overflow-x-hidden hover:bg-[#2A2A2A]'
                  >
                    <div>
                      <img
                        src={album.cover_medium}
                        alt='track album image'
                        className='w-[100%] mx-auto cursor-pointer rounded-lg'
                      />
                    </div>
                    <p className='text-sm font-bold cursor-pointer mt-2'>
                      {album.title}
                    </p>
                    <p className='text-sm text-gray-400 mt-1'>
                      {album.release_date.slice(0, 4)} • album
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className='px-8 text-white mt-4'>
        <h2 className='text-2xl font-bold mb-4'>
          {currentArtist.name} Contributors
        </h2>
        {artistContributors.length > 0 && (
          <div className='grid grid-cols-7'>
            {artistContributors.map((contributor) => {
              return (
                <div
                  key={contributor.id}
                  className='col-span-1 px-3 py-3 mb-3 rounded-md overflow-x-hidden hover:bg-[#2A2A2A]'
                >
                  <div>
                    <Link to={`/artist/${contributor.id}`}>
                      <img
                        src={contributor.picture_medium}
                        alt='track album image'
                        className='w-[100%] mx-auto cursor-pointer rounded-full'
                      />
                    </Link>
                  </div>
                  <Link
                    to={`/artist/${contributor.id}`}
                    className='text-sm block font-bold cursor-pointer mt-2 text-center'
                  >
                    {contributor.name}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';

import Background from '../assets/images/collage.jpeg';


function Home() {
  return (
    <div
      style={{ backgroundImage: `url(${ Background })`}}
      className= 'flex bg-contain bg-local h-screen'
    >
      <div className='flex flex-col my-auto space-y-6 items-center'>
        <div className="flex">
          <h2 className="p-5 bg-white bg-opacity-75 text-black text-lg text-center rounded">
            Learn about dog breeds!
          </h2>
        </div>
        <div className='w-1/2'>
          {/* link to search/results page */}
          <p className="p-5 bg-white bg-opacity-75 text-black text-lg text-center rounded">
            This website was created to help prospective puppy parents learn more about
            the dog breeds they are interested in welcoming into their family. Navigate
            to the
            <Link to='/twsearch' className='text-blue-700 font-bold'>
              <i> Search </i>
            </Link>
            page to explore different breeds and their characteristics.
          </p>
        </div>     
        <div className='w-1/2'>
          {/* link to favorites page */}
          <p className='p-5 bg-white bg-opacity-75 text-black text-lg text-center rounded'
          >
            Once you have added one or more dog breeds to your favorites list, visit the 
            <Link to='/favorites' className='text-blue-700 font-bold'>
              <i> Favorites </i>
            </Link>
            page to review your selections.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home

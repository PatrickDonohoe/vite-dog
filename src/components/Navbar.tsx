import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import NavButton from './NavButton';
import ClickButton from './ClickButton';

const mobileMediaQuery = '(max-width: 750px)';

function Navbar() {

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [isVisible, setIsVisible] = useState(false);
  const [isSmall, setIsSmall] = useState(window.matchMedia(mobileMediaQuery).matches);

  useEffect(() => {
    const query = window.matchMedia(mobileMediaQuery);

    function handleQueryChange(queryEvent: { matches: boolean | ((prevState: boolean) => boolean); }) {
      setIsSmall(queryEvent.matches);
    };

    query.addEventListener('change', handleQueryChange);

    return () => {
      query.removeEventListener('change', handleQueryChange);
    };
  }, []);

  const signOutOnClick = () => {
    logout();
  }

  const signInOnClick = () => {
    loginWithRedirect();
  }

  const dropDown = () => {
    setIsVisible(!isVisible)
  }

  // const clicked = () => {
  //   setIsVisible(false)
  // }

  return (
    // TODO: add hover text for nav icons
    <nav className='flex flex-direction-row justify-around align-middle bg-[#EAE2B7] 
      border-solid border-2 border-black rounded-sm px-2 md:px-6 py-2 md:py-4 sticky 
      top-0 w-full h-24 z-10'
    >
      <div className='flex items-center justify-around flex-shrink-0 mr-2 bg-[#FCBF49] 
        p-3 m-5 border border-[#D62828] rounded-md'
      >
        <Link to='/' className='flex font-semibold text-xl tracking-tight text-[#003049] 
          hover:text-[#D62828]'
        >
          Dog Breeds
        </Link>
      </div>
      

      {/* if the window is small & dropDown is true. display the menu with icons only */}
      {(isSmall && isVisible) ?
        (
          <div className='flex justify-around items-center w-4/6'>
            <div className="flex items-center text-sm lg:flex-grow border-[#003049] border-2 
              rounded-md justify-around h-16"
            >
              {/* Home Button */}
              <NavButton icon='fa-solid fa-house' route='/' />

              {
                !isAuthenticated ?
                  // Login Button
                  <ClickButton 
                    icon='fa-solid fa-right-to-bracket' 
                    route='/'
                    onClick={signInOnClick}
                  />
                  :
                  <>
                    {/* Search Button */}
                    <NavButton icon='fa-solid fa-magnifying-glass' route='/twsearch'/>
                    {/* Favorites Button */}
                    <NavButton icon='fa-solid fa-heart' route='/favorites'/>
                    {/* Logout Button */}
                    <ClickButton 
                      icon='fa-solid fa-door-open' 
                      route='/' 
                      onClick={signOutOnClick}
                    />
                  </>
              }
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* if isSmall, show hamburger, else show full navbar */}
      {isSmall ?
        (
          <div className='block'>
            {/* Hamburger Button */}
            <button onClick={dropDown} className='flex items-center px-3 py-2 
          text-[#003049] border rounded border-[#003049] hover:text-[#D62828] 
          hover:border-[#D62828]'
            >
              <i className='fas fa-bars'></i>
            </button>
          </div>
        )
        :
        (
          <div className='flex w-4/6'>
            <div className="flex text-sm lg:flex-grow border-[#003049] border-2 
              rounded-md justify-around items-center"
            >
              {/* Home Button */}
              <NavButton icon='fa-solid fa-house' route='/' linkText=' Home'/>

              {
                !isAuthenticated ?
                  // Login Button
                  <ClickButton 
                    icon='fa-solid fa-right-to-bracket' 
                    route='/' 
                    linkText=' Login' 
                    onClick={signInOnClick}
                  />
                  :
                  <>
                    <NavButton icon='fa-solid fa-magnifying-glass' route='/twsearch' linkText=' Search'/>
                    {/* Favorites Button */}
                    <NavButton icon='fa-solid fa-heart' route='/favorites' linkText=' Favorites'/>
                    {/* Logout Button */}
                    <ClickButton 
                      icon='fa-solid fa-door-open' 
                      route='/' 
                      linkText=' Logout' 
                      onClick={signOutOnClick}
                    />
                  </>
              }
            </div>
          </div>
        )
      }
    </nav>
  )
}

export default Navbar

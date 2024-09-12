import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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
    <nav className='flex flex-direction-row justify-around align-middle bg-[#EAE2B7] border-solid border-2 border-black rounded-sm px-6 py-4 sticky top-0 w-full z-10'>
      <div className='flex items-center justify-around flex-shrink-0 mr-2 bg-[#FCBF49] p-3 m-5 border border-[#D62828] rounded-md'>
        <Link to='/' className='flex font-semibold text-xl tracking-tight text-[#003049] hover:text-[#D62828]'>
          Dog Breeds
        </Link>
      </div>
      

      {/* if the window is small & dropDown is true. display the menu with icons only */}
      {(isSmall && isVisible) ?
        (
          <div className='flex w-4/6 mt-2 '>
            <div className="flex text-sm lg:flex-grow border-[#003049] border-2 rounded-md justify-around">
              <button className='p-3 m-5 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md'>
                <div>
                  <Link to='' className='flex place-itmes-center mt-4 
                lg:inline-block lg:mt-0 text-[#003049] hover:text-white'
                  >
                    <i className='fa-solid fa-house'></i>
                  </Link>
                </div>
              </button>

              {
                !isAuthenticated ?
                  <button className='p-3 m-5 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md'>
                    <div>
                      <Link to='/' onClick={signInOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-[#003049] hover:text-white'>
                        <i className='fa-solid fa-right-to-bracket'></i>
                      </Link>
                    </div>
                  </button>
                  :
                  <>
                    <button className='p-3 m-5 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md'>
                      <div>
                        <Link to='/twsearch' className='flex place-itmes-center mt-4 
                        lg:inline-block lg:mt-0 text-[#003049] hover:text-white'
                        >
                          <i className='fa-solid fa-magnifying-glass'></i>
                        </Link>
                      </div>
                    </button>
                    <button className='p-3 m-5 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md'>
                      <div>
                        <Link to='/favorites' className='flex place-itmes-center mt-4 
                        lg:inline-block lg:mt-0 text-[#003049] hover:text-white'
                        >
                          <i className='fa-solid fa-heart'></i>
                        </Link>
                      </div>
                    </button>
                    <button className='p-3 m-5 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md'>
                      <div>
                        <Link to='/' onClick={signOutOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-[#003049] hover:text-white'>
                          <i className='fa-solid fa-door-open'></i>
                        </Link>
                      </div>
                    </button>
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
          <div className='flex w-4/6 mt-2 '>
            <div className="flex text-sm lg:flex-grow border-[#003049] border-2 rounded-md justify-around">
              <button className='p-3 m-5 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md'>
                <div>
                  <Link to='' className='flex place-itmes-center mt-4 
                lg:inline-block lg:mt-0 text-[#003049] hover:text-white'
                  >
                    <i className='fa-solid fa-house'></i> Home
                  </Link>
                </div>
              </button>

              {
                !isAuthenticated ?
                  <button className='p-3 m-5 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md'>
                    <div>
                      <Link to='/' onClick={signInOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-[#003049] hover:text-white'>
                        <i className='fa-solid fa-right-to-bracket'></i> Login
                      </Link>
                    </div>
                  </button>
                  :
                  <>
                    <button className='p-3 m-5 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md'>
                      <div>
                        <Link to='/twsearch' className='flex place-itmes-center mt-4 
                        lg:inline-block lg:mt-0 text-[#003049] hover:text-white'
                        >
                          <i className='fa-solid fa-magnifying-glass'></i> Search
                        </Link>
                      </div>
                    </button>
                    <button className='p-3 m-5 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md'>
                      <div>
                        <Link to='/favorites' className='flex place-itmes-center mt-4 
                        lg:inline-block lg:mt-0 text-[#003049] hover:text-white'
                        >
                          <i className='fa-solid fa-heart'></i> Favorites
                        </Link>
                      </div>
                    </button>
                    <button className='p-3 m-5 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md'>
                      <div>
                        <Link to='/' onClick={signOutOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-[#003049] hover:text-white'>
                          <i className='fa-solid fa-door-open'></i>  Logout
                        </Link>
                      </div>
                    </button>
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

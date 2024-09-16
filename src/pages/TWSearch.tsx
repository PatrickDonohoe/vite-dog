import { useState } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import MultipleSelect from "../components/MultipleSelect";
import { BreedDetailsProps } from "../types/breedDetailsProps";
import TWResultsTile from "../components/TWResultsTile";
// import Background1 from '../assets/images/jakob-owens.jpeg';
import Background2 from '../assets/images/karsten-winegeart.jpeg';
// import Background3 from '../assets/images/tim-mossholder.jpeg';


const TWSearch = () => {
  // props stored in state
  const [breedDetails, setBreedDetails] = useState<BreedDetailsProps>()

  return (
    <>
      <div>
        <MultipleSelect
          setBreedDetails={setBreedDetails}
        />
      </div>
      
        <div className="flex bg-[#FCBF49] p-2">
          <div className="flex w-3/4 md:w-1/2 justify-center mx-auto bg-[#EAE2B7] border-2
            border-solid border-black rounded-md p-2">
            <p className="text-[#003049] text-sm md:text-md">
              Choose a breed from the dropdown menu above. Add a note about the breed
              to look back on later. See the
              <Link to='/favorites' className='text-blue-700 font-bold'>
                <i> Favorites </i>
              </Link>
              page to review your favorite
              breeds and the notes you made about them.
            </p>
          </div>
        </div>
        {breedDetails
        ? (
          <TWResultsTile 
            breedDetails = { breedDetails as BreedDetailsProps}
          />
        ) : (
          <div
            className="justify-center bg-cover bg-top bg-local h-screen"
            style={{ backgroundImage: `url(${Background2})` }}
          >
          </div>
        )
      }
            {/* </div> */}
            {/* ) : (
          // Do I store breeds searched in a database and perform queries to display data?
          <div className="bg-gray-200">Top 10 Searched Breeds</div>
        )
      } */}

          </>
        )
      }

      export default withAuthenticationRequired(TWSearch, {onRedirecting: () =>
      <div>Redirecting you to the login page...</div>, 
});

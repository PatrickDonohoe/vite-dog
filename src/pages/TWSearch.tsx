import { useState } from "react";

import MultipleSelect from "../components/MultipleSelect";
import { BreedDetailsProps } from "../types/breedDetailsProps";
import TWResultsTile from "../components/TWResultsTile";

const TWSearch = () => {
  // props stored in state
  const [breedDetails, setBreedDetails] = useState<BreedDetailsProps>()

  return (
    <>
      <div>
        <MultipleSelect
          setBreedDetails = { setBreedDetails }
        />
      </div>
      {/* {breedDetails
        ? ( */}
          <div>
            <TWResultsTile 
              breedDetails = { breedDetails as BreedDetailsProps}
            />
          </div>
        {/* ) : (
          // Do I store breeds searched in a database and perform queries to display data?
          <div className="bg-gray-200">Top 10 Searched Breeds</div>
        )
      } */}
      
    </>
  )
}

export default TWSearch;
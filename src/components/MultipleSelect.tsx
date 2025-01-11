import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { BreedDetailsProps } from '../types/breedDetailsProps';

import { server_calls } from '../api/server';
import { dog_server_calls } from '../api/dog_server';

// props being fed to breedDetails state so it can get back correct data and 
// data types from TheDogAPI

interface Props {
  setBreedDetails: Dispatch<SetStateAction<BreedDetailsProps | undefined>>
}

// props being fed to BreedList, only using dict_breed_name and dict_breed_id
interface BreedList {
  dict_breed_name: string;
  dict_breed_id: number;
  dict_id: number;
}

const MultipleSelect: React.FC<Props> = ({ setBreedDetails }) => {
  const [breedList, setBreedList] = useState<BreedList[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [matchingIds, setMatchingIds] = useState<number>();
  // breedDetails needs to be available at the Parent level(Results.tsx) to this component
  // const [breedDetails, setBreedDetails] = useState<ResultsTileProps2|null>(null)

  // on mount, retrieve all breed names for drop down from own db
  const getBreedList = async () => {
    const data = await server_calls.get_dogdicts()
    console.log(data)
    setBreedList(data)
  }
  useEffect(() => {
    getBreedList()
  }, [])


  // handles adding breedName to list of selected breeds when a breedName is clicked
  const handleBreedNameChange = async (event: SelectChangeEvent<typeof selectedBreed>) => {
    const {
      target: { value },
    } = event;
    console.log(value)
    setSelectedBreed(
      value,
    );
  };
  // when selectedBreed changes, fetch the matching dict_breed_id from breedList
  // set matching ids to state of MatchingIds
  // dict_breed_id required for TheDogAPI call to retrieve reference_image_id
  useEffect(() => {
    for (let breed of breedList) {
      if (breed.dict_breed_name === selectedBreed) {
        setMatchingIds(breed.dict_breed_id)
        console.log('found dog name')
        console.log('selected breed == ')
        console.log(selectedBreed)
      }
    }
  }, [selectedBreed])

  console.log('Matching Ids are...')
  console.log(matchingIds)

  // onSubmit, retrieve all breedDetails described in ResultsTileProps2
  // set state of breedDetails to data retrieved from dog_server_calls.get
  const onSubmitSelect = async (event: any) => {
    if (event) event.preventDefault()
    console.log('submitting')
    const details = await dog_server_calls.get(matchingIds as number)
    setBreedDetails(details)
  }

  return (
    // TODO: add color gradient to this div getting darker as it goes to the edges
    <div className='bg-[#FCBF49]'>
      <form className='flex justify-center md:pt-2 items-center' onSubmit={(onSubmitSelect)}>
        <FormControl className=' justify-center' sx={{ m: 2 }}>
          {/* <Stack
            spacing={2}
            justifyContent={'space-around'}
            direction='row'
            
          > */}
          <div>
            <InputLabel
              id="breed_name-multiple-name-label"
            // className='text-[#003049] text-lg justify-start'
            // sx={{pl:12, pt:0}}
            >
              Breed Names
            </InputLabel>
            <Select
              className='bg-gray-200'
              variant='outlined'
              label='Breed Names'
              labelId="breed_name-multiple-name-label"
              value={selectedBreed}
              id="breed_name=multiple-name"
              onChange={handleBreedNameChange}
              autoWidth={true}
              sx={{ width: 300, height: 60 }}
            >

              {/* display all breed names listed in the dog_dict table */}
              {breedList.map(({ dict_breed_name, dict_breed_id }) => (
                <MenuItem
                  key={dict_breed_id}
                  value={dict_breed_name}
                >
                  {dict_breed_name}
                </MenuItem>
              ))}
            </Select>

          </div>
          {/* <CardActions className='justify-end'> */}

          {/* </CardActions> */}
          {/* </Stack> */}
        </FormControl>
        <button
          type='submit'
          id='search-submit'
          className='px-4 mx-8 my-2 h-10 justify-end bg-[#EAE2B7] border border-[#D62828]
                 text-[#003049]  rounded-md hover:bg-[#F77F00] hover:text-white'
        >
          Submit
        </button>
      </form>
    </div>

  )
};

export default MultipleSelect;
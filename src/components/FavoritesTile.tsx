// Need a reusable tile to display dog image, dog breed, and various attributes of the dog.
// Will also include sections for the user to make notes and do CRUD operations.
import React, { useState, useEffect, ChangeEventHandler } from "react"
import { useForm } from "react-hook-form"

import { FavoriteType } from "../types/favoritesType"
import { BreedDetailsProps } from "../types/breedDetailsProps"
import Alert from "./Alert";
import { server_calls } from "../api/server"
import { dog_server_calls } from "../api/dog_server"

// interface BreedDetailsProps {
//   url: string;
//   breeds: [{
//     name: string;
//     breed_group: string;
//     life_span: string;
//     height: { metric: string };
//     weight: { metric: string };
//     temperament: string;
//     reference_image_id: string;
//   }]
// }


// List of favorited dog breeds by the user being passed in
const FavoritesTile: React.FC<FavoriteType> = ( favList ) => {

  const { register, handleSubmit } = useForm({})

  // the actual notes the user is typing in
  const [favNotes, setFavNotes] = useState('')
  // notes loaded onto the card for display
  const [prevNotes, setPrevNotes] = useState(favList.notes)

  const [alert, setAlert] = useState(false);

  const openAlert = () => setAlert(true);
  const closeAlert = () => setAlert(false);

  // Data to fill FavoritesTile
  const [favData, setFavData] = useState<BreedDetailsProps>()

  const getFavData = async () => {
    const data = await dog_server_calls.get_image_data(favList.image_id)
    setFavData(data)
  }
  useEffect( () => {
    getFavData()
  }, [])
  // on mount, retrieves all favorited breeds by the current user
  // taken care of in Favorites.tsx

  const handleFavNotesChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setFavNotes(event.target.value)
  }

  // TODO: change state of favList; currently deletes breed but does not remove tile until page refreshes
  const deleteFav = () => {
    server_calls.delete_note(favList.breedNotes_Id)
    setFavData(undefined)
  }

  const onSubmitUpdate = (data: any, event: any) => {
    if (event) event.preventDefault()
    console.log(favList.breedNotes_Id)
    console.log(data)
    server_calls.update_note(favList.breedNotes_Id, data)
    setPrevNotes(favNotes)
    openAlert();
    setFavNotes('')
  }

  return (
    <div>
      {favData
        ? (
          <form 
            onSubmit={handleSubmit(onSubmitUpdate)}
            className="flex flex-direction-row justify-center py-5 bg-[#EFF2C0]"
          >
            <article className='rounded-xl border-2 border-gray-700 bg-[#EAE2B7] p-4 object-contain'>
              <div className='flex justify-around space-x-2'>
                <img 
                  alt='picture of the chosen breed'
                  src={favData.url}
                  // TODO: fix flex of image
                  className='flex-2 max-w-md rounded-full object-contain shadow-xl aspect-auto'
                />
                <div className='flex flex-col m-auto justify-center bg-[#FCBF49] border-[#D62828] 
                  border-2 rounded-md 
                  '>
                  <h3 className='flex text-lg font-medium justify-center text-[#D62828]'>
                    Breed Name:
                  </h3>
                  <h3 className='flex text-lg font-medium justify-center text-center text-[#D62828]'>
                    {favData.breeds[0].name}
                  </h3>
                  <div flex-1>
                    <ul className='m-1 flex flex-wrap justify-center'>
                      <li className='p-1 leading-none'>
                        <a href='#' className='text-xs font-medium text-[#003049] text-center'>
                          Adoptable Pets for this Breed
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <ul className='mt-4 p-4 space-y-2 bg-[#FCBF49] border-[#D62828] 
                text-[#003049] border-2 rounded-md'
              >
                <li>
                  <h5>
                    {`Breed Name: ${favData.breeds[0].name}`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Breed Group: ${favData.breeds[0].breed_group}`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Life Span: ${favData.breeds[0].life_span}`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Weight: ${favData.breeds[0].weight.metric} Kg`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Height: ${favData.breeds[0].height.metric} cm`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Temperament: ${favData.breeds[0].temperament}`}
                  </h5>
                </li>
                <li>
                  <h5>
                    {`Previously written notes: ${prevNotes}`}
                  </h5>
                </li>
              </ul>
              <div className="my-2">
                <label className='mx-2' htmlFor='notesele'>Notes:</label>
              </div>
              <div className="bg-[#EAE2B7]">
                <div className="flex justify-center w-250">
                  <textarea
                    className="box-border w-9/12 rounded-md border-2 border-[#D62828] text-black p-2"
                    {...register('notes')}
                    name='notes'
                    id="notesele"
                    value={ favNotes }
                    onChange={handleFavNotesChange}
                    placeholder='Add notes about this breed here if you would like to change what you wrote.'
                  />
                </div>
              </div>
              <div className='flex justify-end'>  
                <button
                  type='submit'
                  id='favorite-update'
                  className='py-2 px-4 m-4 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md text-[#003049] hover:text-white'
                >
                  Edit Favorite
                </button>  
                <button onClick={deleteFav} type='button' id='favorite-delete'
                  className='p-2 m-4 bg-[#FCBF49] hover:bg-[#F77F00] justify-center border-[#D62828] border rounded-md text-[#003049] hover:text-white'
                >
                  Delete Favorite
                </button>
              </div>
              { alert ? 
                (
                  <Alert
                    onClose={closeAlert}
                    message="The changes to your notes have been saved."
                  />
                ) : (<></>)
              }
            </article>
          </form>
        ) : null
      }
    </div>
  )
}

export default FavoritesTile

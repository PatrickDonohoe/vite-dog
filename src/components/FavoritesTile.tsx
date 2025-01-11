import React, { useState, useEffect, ChangeEventHandler } from "react"
import { useForm } from "react-hook-form"

import { FavoriteType } from "../types/favoritesType"
import { BreedDetailsProps } from "../types/breedDetailsProps"
import Alert from "./Alert";
import { server_calls } from "../api/server"
import { dog_server_calls } from "../api/dog_server"
import Background1 from '../assets/images/jakob-owens.jpeg';

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
    <div 
      className="justify-center bg-cover bg-top bg-local w-full"
      style={{ backgroundImage: `url(${Background1})` }}
    >
      {favData
        ? (
          <form 
            onSubmit={handleSubmit(onSubmitUpdate)}
            className="flex flex-direction-row justify-center py-5"
          >
            <article className='container rounded-xl border-2 border-gray-700 bg-custom_yellow1 
              p-2 object-contain max-w-2xl'
            >
              <div className='flex flex-col md:flex-row items-center space-y-2'>
                <img 
                  alt='picture of the chosen breed'
                  src={favData.url}
                  className='flex-2 max-w-md rounded-full object-contain shadow-xl aspect-auto'
                />
                <div className='flex flex-col m-auto justify-center p-1 bg-custom_yellow2 border-custom_red 
                  border-2 rounded-md'>
                  <h3 className='flex text-lg font-medium justify-center text-custom_red'>
                    Breed Name:
                  </h3>
                  <h3 className='flex text-lg font-medium justify-center text-center text-custom_red'>
                    {favData.breeds[0].name}
                  </h3>
                  {/* TODO: add in adoptable pets if time allows */}
                  {/* <div flex-1>
                    <ul className='m-1 flex flex-wrap justify-center'>
                      <li className='p-1 leading-none'>
                        <a href='#' className='text-xs font-medium text-custom_blue text-center'>
                          Adoptable Pets for this Breed
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
              <ul className='mt-4 p-4 space-y-2 bg-custom_yellow2 border-custom_red 
                text-custom_blue border-2 rounded-md'
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
                <li className="border-2 border-custom_red rounded-md py-1">
                  <h5 className="text-center font-bold">
                    {`Previously written notes: ${prevNotes}`}
                  </h5>
                </li>
              </ul>
              <div className="my-2">
                <label className='mx-2' htmlFor='notesele'>Notes:</label>
              </div>
              <div className="bg-custom_yellow1">
                <div className="flex justify-center w-250">
                  <textarea
                    className="box-border w-9/12 rounded-md border-2 border-custom_red text-black p-2"
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
                  className='py-2 px-4 m-4 bg-custom_yellow2 hover:bg-[#F77F00] justify-center border-custom_red border rounded-md text-custom_blue hover:text-white'
                >
                  Edit Favorite
                </button>  
                <button onClick={deleteFav} type='button' id='favorite-delete'
                  className='p-2 m-4 bg-custom_yellow2 hover:bg-[#F77F00] justify-center border-custom_red border rounded-md text-custom_blue hover:text-white'
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
